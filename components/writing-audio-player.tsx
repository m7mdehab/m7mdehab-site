"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import styles from "@/components/writing-audio-player.module.css";

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;
const playbackRateKey = "m7mdehab-writing-playback-rate";
const voicePresetKey = "m7mdehab-writing-voice-preset";

type PlaybackStatus = "idle" | "playing" | "paused" | "unsupported";
type VoicePreset = "natural" | "us" | "uk" | "system";

function voiceScore(voice: SpeechSynthesisVoice, preset: VoicePreset) {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase();
  let score = 0;

  if (!lang.startsWith("en")) return -1000;
  if (/natural|neural|premium|enhanced/.test(name)) score += 120;
  if (/aria|jenny|ava|sonia|ryan|samantha|guy/.test(name)) score += 50;
  if (/google/.test(name)) score += 40;
  if (/microsoft/.test(name)) score += 20;
  if (voice.default) score += 12;
  if (voice.localService) score += 5;

  if (preset === "us") score += lang.startsWith("en-us") ? 100 : -20;
  if (preset === "uk") score += lang.startsWith("en-gb") ? 100 : -20;
  if (preset === "system") score += voice.default ? 250 : 0;

  return score;
}

function selectVoice(preset: VoicePreset) {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return undefined;

  return [...voices]
    .sort((left, right) => voiceScore(right, preset) - voiceScore(left, preset))[0];
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
  const voicePresetRef = useRef<VoicePreset>("natural");
  const speedRef = useRef<HTMLSelectElement>(null);
  const voiceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const storedRate = Number.parseFloat(window.localStorage.getItem(playbackRateKey) ?? "");
    if (playbackRates.includes(storedRate as (typeof playbackRates)[number])) {
      rateRef.current = storedRate;
      if (speedRef.current) speedRef.current.value = String(storedRate);
    }

    const storedVoice = window.localStorage.getItem(voicePresetKey) as VoicePreset | null;
    if (storedVoice && ["natural", "us", "uk", "system"].includes(storedVoice)) {
      voicePresetRef.current = storedVoice;
      if (voiceRef.current) voiceRef.current.value = storedVoice;
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
    const voice = selectVoice(voicePresetRef.current);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

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
        <span>Text-to-speech · ~{listenMinutes} min at 1×</span>
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
        <span>{status === "unsupported" ? "Text-to-speech is not available in this browser." : `${progressLabel}`}</span>
      </div>

      <label className={styles.voice}>
        <span>Voice</span>
        <select
          ref={voiceRef}
          defaultValue="natural"
          onChange={(event) => {
            const next = event.currentTarget.value as VoicePreset;
            voicePresetRef.current = next;
            window.localStorage.setItem(voicePresetKey, next);
            if (status === "playing" || status === "paused") startAt(currentIndexRef.current);
          }}
          aria-label="Narration voice"
        >
          <option value="natural">Natural</option>
          <option value="us">US English</option>
          <option value="uk">UK English</option>
          <option value="system">System</option>
        </select>
      </label>

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