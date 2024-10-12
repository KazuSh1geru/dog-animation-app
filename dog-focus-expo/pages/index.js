import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { AnimatePresence, MotiView } from 'moti'; // MotiはReact Nativeでのアニメーション用ライブラリ

export default function App() {
  const [screen, setScreen] = useState('start');
  const [showBubble, setShowBubble] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (screen === 'timer' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        setStudyTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (timeLeft === 0 && screen === 'timer') {
      setScreen('complete');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [screen, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerDuration * 60);
    setScreen('timer');
    setShowBubble(false);
  };

  const stopTimer = () => {
    setScreen('complete');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {screen === 'start' && (
        <View style={styles.centered}>
          <Text onPress={() => setShowBubble(!showBubble)} style={styles.dogText}>🐶</Text>
          <Text style={styles.text}>犬をクリックしてスタート</Text>
          <AnimatePresence>
            {showBubble && (
              <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={styles.bubble}
              >
                <Text style={styles.bubbleText}>タイマーをセット</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="分数を入力"
                  value={String(timerDuration)}
                  onChangeText={(text) => setTimerDuration(Number(text))}
                />
                <Button title="開始" onPress={startTimer} />
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      )}

      {screen === 'timer' && (
        <View style={styles.centered}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          {/* WalkingDogアニメーションをここに追加 */}
          <Button title="タイマーを止める" onPress={stopTimer} />
        </View>
      )}

      {screen === 'complete' && (
        <View style={styles.centered}>
          <Text style={styles.completeText}>完了！</Text>
          {/* HappyDogアニメーションをここに追加 */}
          <Text style={styles.studyTimeText}>勉強時間: {formatTime(studyTime)}</Text>
          <Button title="もう一度" onPress={() => setScreen('start')} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  centered: {
    alignItems: "center",
  },
  dogText: {
    fontSize: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  bubble: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  bubbleText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: 100,
    textAlign: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  completeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  studyTimeText: {
    fontSize: 16,
    marginVertical: 10,
  },
});
