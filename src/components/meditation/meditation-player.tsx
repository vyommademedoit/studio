"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import * as Tone from "tone";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
} from "lucide-react";

type SoundType = "rain" | "forest" | "waves" | "none";

export function MeditationPlayer() {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState<SoundType>("none");
  const [volume, setVolume] = useState(50);

  const noise = useRef<Tone.Noise | null>(null);
  const filter = useRef<Tone.Filter | null>(null);
  const autoFilter = useRef<Tone.AutoFilter | null>(null);
  const gain = useRef<Tone.Gain | null>(null);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    // Ensure Tone.js starts on user interaction
    const startAudio = async () => {
      await Tone.start();
    };
    window.addEventListener("click", startAudio, { once: true });

    // Initialize audio components
    gain.current = new Tone.Gain(volume / 100).toDestination();
    noise.current = new Tone.Noise("white");
    filter.current = new Tone.Filter(1000, "lowpass");
    autoFilter.current = new Tone.AutoFilter("4n").start();

    noise.current.chain(filter.current, autoFilter.current, gain.current);

    return () => {
      window.removeEventListener("click", startAudio);
      if (timerId.current) clearInterval(timerId.current);
      noise.current?.dispose();
      filter.current?.dispose();
      autoFilter.current?.dispose();
      gain.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (gain.current) {
      gain.current.gain.value = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (noise.current && filter.current && autoFilter.current) {
      noise.current.stop();
      if (selectedSound !== "none") {
        switch (selectedSound) {
          case "rain":
            noise.current.type = "pink";
            filter.current.frequency.value = 5000;
            autoFilter.current.frequency.value = 0.5;
            autoFilter.current.depth.value = 0.8;
            break;
          case "forest":
            noise.current.type = "brown";
            filter.current.frequency.value = 1500;
            autoFilter.current.frequency.value = 0.2;
            autoFilter.current.depth.value = 0.5;
            break;
          case "waves":
            noise.current.type = "white";
            filter.current.frequency.value = 2000;
            autoFilter.current.frequency.value = 0.1;
            autoFilter.current.depth.value = 1;
            break;
        }
        if (isPlaying) {
          noise.current.start();
        }
      }
    }
  }, [selectedSound, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      timerId.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerId.current) clearInterval(timerId.current);
    }
    return () => {
      if (timerId.current) clearInterval(timerId.current);
    };
  }, [isPlaying, duration]);

  const handlePlayPause = async () => {
    if (Tone.context.state !== "running") {
      await Tone.start();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(duration);
  }

  const handleDurationChange = (value: string) => {
    const newDuration = parseInt(value, 10);
    setDuration(newDuration);
    setTimeLeft(newDuration);
    if(isPlaying) setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress = useMemo(() => (duration - timeLeft) / duration, [timeLeft, duration]);
  const circumference = 2 * Math.PI * 140;

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="items-center">
        <div className="relative h-72 w-72">
          <svg className="h-full w-full" viewBox="0 0 300 300">
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="hsl(var(--border))"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="hsl(var(--primary))"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1-progress)}
              transform="rotate(-90 150 150)"
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-6xl font-bold text-foreground">
              {formatTime(timeLeft)}
            </span>
            <span className="text-muted-foreground">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Duration</label>
            <Select
              onValueChange={handleDurationChange}
              defaultValue={String(duration)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
                <SelectItem value="600">10 minutes</SelectItem>
                <SelectItem value="900">15 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Ambient Sound</label>
            <Select
              onValueChange={(v: SoundType) => setSelectedSound(v)}
              defaultValue={selectedSound}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="rain">Rain</SelectItem>
                <SelectItem value="forest">Forest</SelectItem>
                <SelectItem value="waves">Waves</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Volume</label>
          <div className="flex items-center gap-2">
            <VolumeX className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(v) => setVolume(v[0])}
              max={100}
              step={1}
            />
            <Volume2 className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button size="lg" onClick={handlePlayPause}>
          {isPlaying ? (
            <Pause className="mr-2 h-5 w-5" />
          ) : (
            <Play className="mr-2 h-5 w-5" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button size="lg" variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
