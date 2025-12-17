import { useEffect, useState } from "react";

export default function Timer({ paused }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [paused]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="text-center font-semibold mb-3">
      ⏱ {min}:{sec.toString().padStart(2, "0")}
    </div>
  );
}
