import { useState } from "react";
import confetti from "canvas-confetti";
import Pointer from "./Pointer";
import WheelCanvas from "./WheelCanvas";
import { playClick, playWin } from "../../utils/sound";

export default function Wheel({ items, setWinner }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spin = () => {
    if (spinning || items.length < 2) return;
    setSpinning(true);
    setWinner(null);
    playClick();

    const step = 360 / items.length;
    const randomIndex = Math.floor(Math.random() * items.length);
    const centerAngle = randomIndex * step + step / 2;
    const desiredMod = (360 - centerAngle) % 360;
    const extraSpins = 6 * 360;

    setRotation((prev) => {
      const prevMod = ((prev % 360) + 360) % 360;
      const delta = (desiredMod - prevMod + 360) % 360;
      return prev + extraSpins + delta;
    });

    setTimeout(() => {
      setWinner(items[randomIndex], randomIndex);
      setSpinning(false);
      playWin();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }, 4000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div className="wheel-wrapper">
        <div className="wheel-glow" />

        <Pointer />

        <div
          className="wheel-spinner"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s cubic-bezier(0.25,1,0.5,1)" : "none",
          }}
        >
          <WheelCanvas items={items} />
        </div>

        <button
          onClick={spin}
          disabled={spinning || items.length < 2}
          className="spin-btn"
        >
          {spinning ? "..." : "SPIN"}
        </button>
      </div>

      {items.length < 2 && <p className="warning-text">Tambahkan minimal 2 item untuk spin</p>}
    </div>
  );
}