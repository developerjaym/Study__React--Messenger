import { useEffect, useState } from "react";
import "./Clock.css";

export default function Clock() {
  let timer;
  const [count, setCount] = useState(0);

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        setCount((prev) => prev + 1);
      }, 33);
  };

  useEffect(() => {
    updateCount();
    return () => clearInterval(timer);
  }, []);

  const convert = (number) => new Date().toLocaleTimeString() 

  return <h2 className="clock__text text--big text--centered">{convert(count)}</h2>;
}
