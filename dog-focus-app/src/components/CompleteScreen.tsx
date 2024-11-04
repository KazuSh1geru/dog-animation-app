import { Button } from "@/components/ui/button";
import { Happy } from "@/components/DogAnimation";

interface CompleteScreenProps {
  studyTime: number;
  formatTime: (time: number) => string;
  resetScreen: (screen: "start" | "timer") => void;
}

export function CompleteScreen({
  studyTime,
  formatTime,
  resetScreen,
}: CompleteScreenProps) {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">完了！</h2>
      <Happy />
      <p className="my-4">勉強時間: {formatTime(studyTime)}</p>
      <Button onClick={() => resetScreen("start")}>もう一度</Button>
    </div>
  );
}
