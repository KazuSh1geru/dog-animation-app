import cv2
# import numpy as np
import os
from PIL import Image
# import shutil

DIR_PATH = "./dog-focus-app/public"
# 動画ファイルのパス
video_path = os.path.join(DIR_PATH, 'videos/dog_animation.mp4')

# フレームを保存するディレクトリ
frames_dir = './video_frames/'
processed_frames_dir = './processed_video_frames/'
os.makedirs(frames_dir, exist_ok=True)
os.makedirs(processed_frames_dir, exist_ok=True)

# ステップ1: MP4動画をフレームごとに分解して保存
cap = cv2.VideoCapture(video_path)
frame_count = 0
original_frames = []

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    # フレームを保存
    frame_filename = os.path.join(frames_dir, f"frame_{frame_count:04d}.png")
    cv2.imwrite(frame_filename, frame)
    original_frames.append(frame_filename)
    frame_count += 1

cap.release()

# ステップ2: 背景が黒い部分を透過させ、PNG形式でフレームを再保存
processed_frames = []
for frame_path in original_frames:
    # フレームの読み込み
    frame = cv2.imread(frame_path)

    # グレースケールに変換して黒背景を検出
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)

    # アルファチャンネルを追加して黒背景を透過
    b, g, r = cv2.split(frame)
    alpha = mask  # マスクをアルファチャンネルとして使用
    rgba_frame = cv2.merge([b, g, r, alpha])

    # 透過処理されたフレームを保存
    processed_frame_path = os.path.join(processed_frames_dir, os.path.basename(frame_path))
    cv2.imwrite(processed_frame_path, rgba_frame)
    processed_frames.append(processed_frame_path)

# ステップ3: 処理したフレームをAPNGとして保存
frames = [Image.open(frame_path) for frame_path in processed_frames]
apng_path = './animated_transparent_video.png'
frames[0].save(apng_path, save_all=True, append_images=frames[1:], duration=100, loop=0, format="PNG")

print(f"APNG saved at {apng_path}")
