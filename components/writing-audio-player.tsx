"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import type { WritingNarrationVoice } from "@/data/writing";
import styles from "@/components/writing-audio-player.module.css";

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;
const playbackRateKey = "m7mdehab-writing-playback-rate";
const narrationVoiceKey = "m7mdehab-writing-narration-voice";
const followNarrationKey = "m7mdehab-writing-follow-narration";

type NarrationSource = {
  id: WritingNarrationVoice;
  label: string;
  src: string;
  timingsSrc: string;
  mimeType: "audio/mpeg";
};

type NarrationTimingCue = {
  id: string;
  start: number;
  end: number;
};

type NarrationTimingFile = {
  version: number;
  cues: NarrationTimingCue[];
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function findCue(cues: readonly NarrationTimingCue[], time: number) {
  let low = 0;
  let high = cues.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const cue = cues[middle];
    if (time < cue.start) high = middle - 1;
    else if (time >= cue.end) low = middle + 1;
    else return cue;
  }
  return null;
}

export function WritingAudioPlayer({
  title,
  sources,
  listenMinutes,
}: {
  title: string;
  sources: readonly NarrationSource[];
  listenMinutes: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pendingSeekRatioRef = useRef<number | null>(null);
  const pendingResumeRef = useRef(false);
  const activeCueRef = useRef<string | null>(null);
  const [voice, setVoice] = useState<WritingNarrationVoice>("female");
  const [rate, setRate] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(listenMinutes * 60);
  const [followNarration, setFollowNarration] = useState(true);
  const [timings, setTimings] = useState<NarrationTimingCue[]>([]);

  const activeSource =
    sources.find((source) => source.id === voice) ?? sources[0];

  function clearActiveCue() {
    if (!activeCueRef.current) return;
    document
      .querySelector<HTMLElement>(
        `[data-narration-cue="${activeCueRef.current}"]`,
      )
      ?.removeAttribute("data-narration-active");
    activeCueRef.current = null;
  }

  function syncActiveCue(time: number, enabled = followNarration) {
    if (!enabled || timings.length === 0) {
      clearActiveCue();
      return;
    }
    const cue = findCue(timings, time);
    if (cue?.id === activeCueRef.current) return;
    clearActiveCue();
    if (!cue) return;
    const element = document.querySelector<HTMLElement>(
      `[data-narration-cue="${cue.id}"]`,
    );
    if (!element) return;
    element.setAttribute("data-narration-active", "true");
    activeCueRef.current = cue.id;
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedVoice = window.localStorage.getItem(
        narrationVoiceKey,
      ) as WritingNarrationVoice | null;
      if (storedVoice && sources.some((source) => source.id === storedVoice)) {
        setVoice(storedVoice);
      }

      const storedRate = Number.parseFloat(
        window.localStorage.getItem(playbackRateKey) ?? "",
      );
      if (playbackRates.includes(storedRate as (typeof playbackRates)[number])) {
        setRate(storedRate);
      }

      setFollowNarration(
        window.localStorage.getItem(followNarrationKey) !== "false",
      );
    }, 0);

    return () => window.clearTimeout(timer);
  }, [sources]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    let cancelled = false;
    clearActiveCue();
    fetch(activeSource.timingsSrc)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Narration timings request failed: ${response.status}`);
        }
        return response.json() as Promise<NarrationTimingFile>;
      })
      .then((payload) => {
        if (!cancelled && Array.isArray(payload.cues)) setTimings(payload.cues);
      })
      .catch(() => {
        if (!cancelled) setTimings([]);
      });

    return () => {
      cancelled = true;
      clearActiveCue();
    };
  }, [activeSource.timingsSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.load();
  }, [activeSource.src]);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  }

  function seekBy(delta: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const max = Number.isFinite(audio.duration) ? audio.duration : duration;
    audio.currentTime = Math.min(
      Math.max(0, audio.currentTime + delta),
      Math.max(max, 0),
    );
    syncActiveCue(audio.currentTime);
  }

  function changeVoice(next: WritingNarrationVoice) {
    clearActiveCue();
    const audio = audioRef.current;
    const max = audio?.duration;
    const hasFiniteDuration =
      typeof max === "number" && Number.isFinite(max) && max > 0;
    pendingSeekRatioRef.current =
      audio && hasFiniteDuration ? audio.currentTime / max : 0;
    pendingResumeRef.current = Boolean(audio && !audio.paused);
    if (audio && !audio.paused) audio.pause();

    setVoice(next);
    setCurrentTime(0);
    window.localStorage.setItem(narrationVoiceKey, next);
  }

  return (
    <section
      className={styles.player}
      data-writing-listen
      aria-label="Listen to this article"
    >
      <audio
        ref={audioRef}
        preload="metadata"
        src={activeSource.src}
        onLoadedMetadata={async (event) => {
          const audio = event.currentTarget;
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration);
            const ratio = pendingSeekRatioRef.current;
            if (ratio !== null) {
              audio.currentTime = Math.min(
                Math.max(0, ratio * audio.duration),
                audio.duration,
              );
              setCurrentTime(audio.currentTime);
              pendingSeekRatioRef.current = null;
            }
          }

          syncActiveCue(audio.currentTime);

          if (pendingResumeRef.current) {
            pendingResumeRef.current = false;
            try {
              await audio.play();
            } catch {
              // A browser may reject resumed playback after a source switch.
            }
          }
        }}
        onTimeUpdate={(event) => {
          const next = event.currentTarget.currentTime;
          setCurrentTime(next);
          syncActiveCue(next);
        }}
        onDurationChange={(event) => {
          const next = event.currentTarget.duration;
          if (Number.isFinite(next) && next > 0) setDuration(next);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          clearActiveCue();
        }}
        aria-label={`${activeSource.label} narration of ${title}`}
      />

      <div className={styles.identity}>
        <strong>Listen to article</strong>
        <span>AI narration · ~{listenMinutes} min</span>
        <label
          className={styles.follow}
          title="Highlight the spoken word without moving the page"
        >
          <input
            type="checkbox"
            checked={followNarration}
            disabled={timings.length === 0}
            onChange={(event) => {
              const next = event.currentTarget.checked;
              setFollowNarration(next);
              window.localStorage.setItem(followNarrationKey, String(next));
              if (!next) clearActiveCue();
              else syncActiveCue(audioRef.current?.currentTime ?? currentTime, true);
            }}
            aria-label="Follow narration"
          />
          <span>Follow narration</span>
        </label>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => seekBy(-15)}
          aria-label="Back 15 seconds"
          title="Back 15 seconds"
        >
          <RotateCcw size={16} aria-hidden="true" />
          <span>15</span>
        </button>
        <button
          className={styles.play}
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause article narration" : "Play article narration"}
        >
          {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={() => seekBy(15)}
          aria-label="Forward 15 seconds"
          title="Forward 15 seconds"
        >
          <RotateCw size={16} aria-hidden="true" />
          <span>15</span>
        </button>
      </div>

      <div className={styles.timeline}>
        <input
          type="range"
          min={0}
          max={Math.max(duration, 0)}
          step={0.1}
          value={Math.min(currentTime, Math.max(duration, 0))}
          onChange={(event) => {
            const next = Number(event.currentTarget.value);
            setCurrentTime(next);
            if (audioRef.current) audioRef.current.currentTime = next;
            syncActiveCue(next);
          }}
          aria-label="Article narration progress"
        />
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>

      <label className={styles.voice}>
        <span>Voice</span>
        <select
          value={voice}
          onChange={(event) =>
            changeVoice(event.currentTarget.value as WritingNarrationVoice)
          }
          aria-label="Narration voice"
        >
          {sources.map((source) => (
            <option key={source.id} value={source.id}>{source.label}</option>
          ))}
        </select>
      </label>

      <label className={styles.speed}>
        <span>Speed</span>
        <select
          value={rate}
          onChange={(event) => {
            const next = Number(event.currentTarget.value);
            setRate(next);
            window.localStorage.setItem(playbackRateKey, String(next));
            if (audioRef.current) audioRef.current.playbackRate = next;
          }}
          aria-label="Narration speed"
        >
          {playbackRates.map((value) => (
            <option key={value} value={value}>{value}×</option>
          ))}
        </select>
      </label>
    </section>
  );
}
