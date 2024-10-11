"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Dog, Smile } from 'lucide-react'

export function StudyFocusAppComponent() {
  const [isStarted, setIsStarted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [studyTime, setStudyTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
        setStudyTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (timer === 0 && isRunning) {
      setIsRunning(false)
      setIsCompleted(true)
    }
    return () => clearInterval(interval)
  }, [isRunning, timer])

  const handleStart = () => {
    setShowModal(true)
  }

  const handleSetTimer = (minutes: number) => {
    setTimer(minutes * 60)
    setShowModal(false)
    setIsStarted(true)
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
    setIsCompleted(true)
  }

  const handleReset = () => {
    setIsStarted(false)
    setIsCompleted(false)
    setStudyTime(0)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      {!isStarted ? (
        // スタート画面
        <div className="text-center">
          <Dog className="w-32 h-32 mx-auto mb-4 text-blue-500" />
          <Button onClick={handleStart} size="lg" className="mt-4">
            スタート
          </Button>
        </div>
      ) : isRunning ? (
        // タイマー実行画面
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">{formatTime(timer)}</h2>
          <div className="w-64 h-64 relative">
            <Dog className="w-full h-full text-blue-500 animate-walk" />
          </div>
          <Button onClick={handleStop} variant="destructive" className="mt-4">
            中止
          </Button>
        </div>
      ) : isCompleted ? (
        // 完了画面
        <div className="text-center">
          <Smile className="w-32 h-32 mx-auto mb-4 text-yellow-500" />
          <Alert className="mb-4">
            <AlertTitle>おめでとう！</AlertTitle>
            <AlertDescription>
              {Math.floor(studyTime / 60)}分集中したよ！
            </AlertDescription>
          </Alert>
          <Button onClick={handleReset} className="mt-4">
            ホームに戻る
          </Button>
        </div>
      ) : null}

      {/* タイマーセットモーダル */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>タイマーをセット</DialogTitle>
            <DialogDescription>
              勉強時間（分）を入力してください。
            </DialogDescription>
          </DialogHeader>
          <Input
            type="number"
            placeholder="分"
            onChange={(e) => handleSetTimer(parseInt(e.target.value))}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}