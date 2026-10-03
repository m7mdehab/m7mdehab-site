"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import styles from "@/components/writing-audio-player.module.css";

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;
const playbackRateKey = "m7mdehab-writing-playback-rate";

type PlaybackStatus = "idle" | "playing" | "paused" | "unsupported";

function preferredEnglishVoice() {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => /^en[-_]/i.test(voice.lang) && voice.localService)
    ?? voices.find((voice) => /^en[-_]/i.test(voice.lang));
}

export function WritingAudioPlayer({
  title,
  chunks,
  listenMinutes,
}: {
  title: string;
  chunks: readonly string[];
  listenMinutes: number;
}) {
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const generationRef = useRef(0);
  const rateRef = useRef(1);
  const speedRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const stored = Number.parseFloat(window.localStorage.getItem(playbackRateKey) ?? "");
    if (playbackRates.includes(stored as (typeof playbackRates)[number])) {
      rateRef.current = stored;
      if (speedRef.current) speedRef.current.value = String(stored);
    }

    return () => {
      generationRef.current += 1;
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function syncIndex(index: number) {
    const bounded = Math.min(Math.max(index, 0), Math.max(chunks.length - 1, 0));
    currentIndexRef.current = bounded;
    setCurrentIndex(bounded);
    return bounded;
  }

  function speakChunk(index: number, generation: number) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("unsupported");
      return;
    }

    if (generation !== generationRef.current || index >= chunks.length) {
      setStatus("idle");
      if (index >= chunks.length) syncIndex(0);
      return;
    }

    const bounded = syncIndex(index);
    const utterance = new SpeechSynthesisUtterance(chunks[bounded]);
    utterance.rate = rateRef.current;
    utterance.lang = "en-US";
    const voice = preferredEnglishVoice();
    if (voice) utterance.voice = voice;

    utterance.onstart = () => {
      if (generation === generationRef.current) setStatus("playing");
    };
    utterance.onend = () => {
      if (generation !== generationRef.current) return;
      speakChunk(bounded + 1, generation);
    };
    utterance.onerror = (event) => {
      if (generation !== generationRef.current || event.error === "canceled" || event.error === "interrupted") return;
      setStatus("idle");
    };

    window.speechSynthesis.speak(utterance);
  }

  function startAt(index: number) {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("unsupported");
      return;
    }
    generationRef.current += 1;
    const generation = generationRef.current;
    window.speechSynthesis.cancel();
    speakChunk(syncIndex(index), generation);
  }

  function togglePlayback() {
    if (!("speechSynthesis" in window)) {
      setStatus("unsupported");
      return;
    }

    if (status === "playing") {
      window.speechSynthesis.pause();
      setStatus("paused");
      return;
    }

    if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    startAt(currentIndexRef.current);
  }

  function movePassage(delta: number) {
    const next = syncIndex(currentIndexRef.current + delta);
    if (status === "playing" || status === "paused") startAt(next);
  }

  const progressMax = Math.max(chunks.length - 1, 0);
  const progressLabel = chunks.length ? `${currentIndex + 1} / ${chunks.length}` : "0 / 0";

  return (
    <section className={styles.player} data-writing-listen aria-label="Listen to this article">
      <div className={styles.identity}>
        <strong>Listen to article</strong>
        <span>Browser narration · ~{listenMinutes} min at 1×</span>
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={() => movePassage(-1)} disabled={currentIndex === 0} aria-label="Previous passage" title="Previous passage">
          <RotateCcw size={16} aria-hidden="true" />
        </button>
        <button className={styles.play} type="button" onClick={togglePlayback} aria-label={status === "playing" ? "Pause article narration" : "Play article narration"}>
          {status === "playing" ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => movePassage(1)} disabled={currentIndex >= progressMax} aria-label="Next passage" title="Next passage">
          <RotateCw size={16} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.timeline}>
        <input
          type="range"
          min={0}
          max={progressMax}
          step={1}
          value={currentIndex}
          onChange={(event) => {
            const next = Number(event.currentTarget.value);
            syncIndex(next);
            if (status === "playing" || status === "paused") startAt(next);
          }}
          aria-label="Article narration progress"
          disabled={chunks.length <= 1}
        />
        <span>{status === "unsupported" ? "Text-to-speech is not available in this browser." : `Passage ${progressLabel}`}</span>
      </div>

      <label className={styles.speed}>
        <span>Speed</span>
        <select
          ref={speedRef}
          defaultValue={1}
          onChange={(event) => {
            const next = Number(event.currentTarget.value);
            rateRef.current = next;
            window.localStorage.setItem(playbackRateKey, String(next));
            if (status === "playing" || status === "paused") startAt(currentIndexRef.current);
          }}
          aria-label="Narration speed"
        >
          {playbackRates.map((value) => <option key={value} value={value}>{value}×</option>)}
        </select>
      </label>
    </section>
  );
}