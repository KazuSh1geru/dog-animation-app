"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from 'framer-motion'

export function StudyFocusAppComponent() {
  const [screen, setScreen] = useState<'start' | 'timer' | 'complete'>('start')
  const [showBubble, setShowBubble] = useState(false)
  const [timerDuration, setTimerDuration] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [studyTime, setStudyTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (screen === 'timer' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
        setStudyTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (timeLeft === 0 && screen === 'timer') {
      setScreen('complete')
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [screen, timeLeft])

  const startTimer = () => {
    setTimeLeft(timerDuration * 60)
    setScreen('timer')
    setShowBubble(false)
  }

  const stopTimer = () => {
    setScreen('complete')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const SpeechBubble = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="absolute left-1/2 bottom-full mb-4 transform -translate-x-1/2"
    >
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <div className="text-lg font-bold mb-2">タイマーをセット</div>
        <Input
          type="number"
          placeholder="分数を入力"
          value={timerDuration}
          onChange={(e) => setTimerDuration(Number(e.target.value))}
          className="mb-2"
        />
        <Button onClick={startTimer} className="w-full">開始</Button>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
      </div>
    </motion.div>
  )

  const WalkingDog = () => (
    <div className="relative w-full h-64 overflow-hidden bg-sky-200">
      {/* Sun */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-300 rounded-full" />
      
      {/* Moving grass */}
      <motion.div
        className="absolute bottom-0 left-0 w-[200%] h-16"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q 25 0, 50 50 T 100 50 V100 H0" fill="#4ade80" />
        </svg>
      </motion.div>
      
      {/* Dog */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 h-24">
          <circle cx="50" cy="50" r="40" fill="#8B4513" />
          <circle cx="35" cy="40" r="5" fill="black" />
          <circle cx="65" cy="40" r="5" fill="black" />
          <path d="M 40 60 Q 50 70 60 60" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="30" cy="80" r="10" fill="#8B4513" />
          <circle cx="70" cy="80" r="10" fill="#8B4513" />
          <path d="M 70 20 L 90 10 L 80 30" fill="#8B4513" />
        </svg>
      </div>
    </div>
  )

  const Dog = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="w-24 h-24">
      <circle cx="50" cy="50" r="40" fill="#8B4513" />
      <circle cx="35" cy="40" r="5" fill="black" />
      <circle cx="65" cy="40" r="5" fill="black" />
      <path d="M 40 60 Q 50 70 60 60" stroke="black" strokeWidth="2" fill="none" />
      <circle cx="30" cy="80" r="10" fill="#8B4513" />
      <circle cx="70" cy="80" r="10" fill="#8B4513" />
      <path d="M 70 20 L 90 10 L 80 30" fill="#8B4513" />
    </svg>
  )

  const HappyDog = () => (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="w-24 h-24"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <circle cx="50" cy="50" r="40" fill="#8B4513" />
      <circle cx="35" cy="40" r="5" fill="black" />
      <circle cx="65" cy="40" r="5" fill="black" />
      <path d="M 30 60 Q 50 80 70 60" stroke="black" strokeWidth="2" fill="none" />
      <circle cx="30" cy="80" r="10" fill="#8B4513" />
      <circle cx="70" cy="80" r="10" fill="#8B4513" />
      <path d="M 70 20 L 90 10 L 80 30" fill="#8B4513" />
    </motion.svg>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {screen === 'start' && (
        <div className="text-center relative">
          <div
            className="mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setShowBubble(!showBubble)}
          >
            <Dog />
          </div>
          <p className="text-lg font-medium text-gray-600">犬をクリックしてスタート</p>
          <AnimatePresence>
            {showBubble && <SpeechBubble />}
          </AnimatePresence>
        </div>
      )}

      {screen === 'timer' && (
        <div className="text-center w-full">
          <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
          <WalkingDog />
          <Button onClick={stopTimer} className="mt-4">タイマーを止める</Button>
        </div>
      )}

      {screen === 'complete' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">完了！</h2>
          <HappyDog />
          <p className="my-4">勉強時間: {formatTime(studyTime)}</p>
          <Button onClick={() => setScreen('start')}>もう一度</Button>
        </div>
      )}
    </div>
  )
}