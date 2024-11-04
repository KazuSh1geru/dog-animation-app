import { Button } from "@/components/ui/button";
import { Walking } from "@/components/DogAnimation";

interface TimerDisplayProps {
  timeLeft: number;
  formatTime: (time: number) => string;
  stopTimer: () => void;
}

export function TimerDisplay({
  timeLeft,
  formatTime,
  stopTimer,
}: TimerDisplayProps) {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      <div className="relative z-10 text-center w-full">
        <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
        <div className="flex justify-center">
          <Walking />
        </div>
        <Button onClick={stopTimer} className="mt-4">
          タイマーを止める
        </Button>
      </div>
    </div>
  );
}
