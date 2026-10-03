"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import styles from "@/components/writing-audio-player.module.css";

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;
const playbackRateKey = "m7mdehab-writing-playback-rate";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function WritingAudioPlayer({
  title,
  src,
  mimeType,
  durationSeconds,
  listenMinutes,
}: {
  title: string;
  src: string;
  mimeType: string;
  durationSeconds: number;
  listenMinutes: number;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const stored = Number.parseFloat(window.localStorage.getItem(playbackRateKey) ?? "");
    if (playbackRates.includes(stored as (typeof playbackRates)[number])) {
      setRate(stored);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    window.localStorage.setItem(playbackRateKey, String(rate));
  }, [rate]);

  const progressMax = useMemo(
    () => (Number.isFinite(duration) && duration > 0 ? duration : durationSeconds),
    [duration, durationSeconds],
  );

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) await audio.play();
    else audio.pause();
  }

  function seekBy(delta: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + delta), progressMax);
  }

  return (
    <section className={styles.player} data-writing-listen aria-label="Listen to this article">
      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => {
          const nextDuration = event.currentTarget.duration;
          if (Number.isFinite(nextDuration) && nextDuration > 0) setDuration(nextDuration);
        }}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        aria-label={`Audio narration of ${title}`}
      >
        <source src={src} type={mimeType} />
      </audio>

      <div className={styles.identity}>
        <strong>Listen</strong>
        <span>{listenMinutes} min narration</span>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => seekBy(-15)} aria-label="Back 15 seconds" title="Back 15 seconds">
          <RotateCcw size={16} aria-hidden="true" />
          <span>15</span>
        </button>
        <button className={styles.play} type="button" onClick={togglePlayback} aria-label={playing ? "Pause article narration" : "Play article narration"}>
          {playing ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => seekBy(15)} aria-label="Forward 15 seconds" title="Forward 15 seconds">
          <RotateCw size={16} aria-hidden="true" />
          <span>15</span>
        </button>
      </div>

      <div className={styles.timeline}>
        <input
          type="range"
          min={0}
          max={progressMax}
          step={0.1}
          value={Math.min(currentTime, progressMax)}
          onChange={(event) => {
            const next = Number(event.currentTarget.value);
            setCurrentTime(next);
            if (audioRef.current) audioRef.current.currentTime = next;
          }}
          aria-label="Audio progress"
        />
        <span>{formatTime(currentTime)} / {formatTime(progressMax)}</span>
      </div>

      <label className={styles.speed}>
        <span>Speed</span>
        <select value={rate} onChange={(event) => setRate(Number(event.currentTarget.value))} aria-label="Playback speed">
          {playbackRates.map((value) => <option key={value} value={value}>{value}×</option>)}
        </select>
      </label>
    </section>
  );
}