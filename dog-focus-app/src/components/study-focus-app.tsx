"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import { Happy, Home, Walking } from "@/components/DogAnimation";
import { SpeechBubble } from "@/components/SpeechBubble";
export function StudyFocusAppComponent() {
  const [screen, setScreen] = useState<"start" | "timer" | "complete">("start");
  const [showBubble, setShowBubble] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (screen === "timer" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setStudyTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timeLeft === 0 && screen === "timer") {
      setScreen("complete");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [screen, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerDuration * 60);
    setScreen("timer");
    setShowBubble(false);
  };

  const stopTimer = () => {
    setScreen("complete");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {screen === "start" && (
        <div className="text-center relative">
          <div
            className="mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowBubble(!showBubble)}
          >
            <Home />
          </div>
          <p className="text-lg font-medium text-gray-600">
            犬をクリックしてスタート
          </p>
          <AnimatePresence>
            {showBubble && (
              <SpeechBubble
                timerDuration={timerDuration}
                setTimerDuration={setTimerDuration}
                startTimer={startTimer}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {screen === "timer" && (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/* Timer and Dog */}
          <div className="relative z-10 text-center w-full">
            <div className="text-4xl font-bold mb-4">
              {formatTime(timeLeft)}
            </div>

            {/* Dog */}
            <div className="flex justify-center">
              <Walking />
            </div>

            <Button onClick={stopTimer} className="mt-4">
              タイマーを止める
            </Button>
          </div>
        </div>
      )}

      {screen === "complete" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">完了！</h2>
          <Happy />
          <p className="my-4">勉強時間: {formatTime(studyTime)}</p>
          <Button onClick={() => setScreen("start")}>もう一度</Button>
        </div>
      )}
    </div>
  );
}
