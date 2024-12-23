"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Home } from "@/components/DogAnimation";
import { SpeechBubble } from "@/components/SpeechBubble";
import { TimerDisplay } from "@/components/TimerDisplay";
import { CompleteScreen } from "@/components/CompleteScreen";
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
    // TODO: start画面として切り出す.
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
        <TimerDisplay
          timeLeft={timeLeft}
          formatTime={formatTime}
          stopTimer={stopTimer}
        />
      )}

      {screen === "complete" && (
        <CompleteScreen
          studyTime={studyTime}
          formatTime={formatTime}
          resetScreen={setScreen}
        />
      )}
    </div>
  );
}
