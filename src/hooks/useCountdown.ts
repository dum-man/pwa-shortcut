import { useState, useEffect } from "react";

/**
 * Хук для обратного отсчёта времени
 * @param {number} initialSeconds - начальное количество секунд
 * @returns {Array} массив с объектом времени (минуты, секунды) и функцией сброса таймера
 */
const useCountdown = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const reset = () => setTimeLeft(initialSeconds);

  // Рассчитываем минуты и секунды
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return [{ minutes, seconds }, reset] as const;
};

export default useCountdown;
