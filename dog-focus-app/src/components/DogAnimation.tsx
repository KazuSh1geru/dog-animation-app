"use client";

export const DogAnimation = () => (
    <div className="w-48 h-48">
      <img
        src="/images/dog_animation.gif"
        className="w-full h-full"
        alt="Dog Animation"
      />
    </div>
  );

// videoパターン
// export const DogAnimation = () => (
//   <div className="w-48 h-48">
//     <video
//       src="/videos/dog_animation.mp4"
//       className="w-full h-full"
//       autoPlay
//       loop
//       muted
//     />
//   </div>
// );