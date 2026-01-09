import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="text-center text-gray-700 font-semibold">
      ⏱ {min}:{sec.toString().padStart(2, "0")}
    </div>
  );
}
