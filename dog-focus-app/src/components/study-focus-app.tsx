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
    <motion.div
      className="w-48 h-48 mx-auto"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <img src="/images/dog_walking.png" alt="Walking Dog" className="w-full h-full" />
    </motion.div>
  )

  const Dog = () => (
    <motion.div
      className="w-48 h-48"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <img src="/images/dog_default.png" alt="Dog" className="w-full h-full" />
    </motion.div>
  )

  const HappyDog = () => (
    <motion.div
      className="w-48 h-48"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
    >
      <img src="/images/dog_default.png" alt="Happy Dog" className="w-full h-full" />
    </motion.div>
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
        <div className="relative w-full h-full overflow-hidden">
          {/* Background GIF */}
          <img src="/path/to/moderate_continuous_cloud_animation.gif" alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />

          {/* Timer and Dog */}
          <div className="relative z-10 text-center w-full">
            <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
            
            {/* Dog */}
            <WalkingDog />

            <Button onClick={stopTimer} className="mt-4">タイマーを止める</Button>
          </div>
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