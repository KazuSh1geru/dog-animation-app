import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SpeechBubbleProps {
  timerDuration: number;
  setTimerDuration: (duration: number) => void;
  startTimer: () => void;
}

export function SpeechBubble({ timerDuration, setTimerDuration, startTimer }: SpeechBubbleProps) {
  return (
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
        <Button onClick={startTimer} className="w-full">
          開始
        </Button>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
      </div>
    </motion.div>
  );
}