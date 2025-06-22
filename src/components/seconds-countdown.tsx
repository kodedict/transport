import {useState, useEffect, useImperativeHandle, ForwardedRef, forwardRef} from "react";

type SecondsCountdownType = {
    seconds: number,
    resetTimer?:boolean,
    onComplete?: () => void,
    resetN?: false,
    ref?: ForwardedRef<any>
}

const SecondsCountdown = forwardRef(({
    seconds,
    onComplete,
    resetTimer = false,
} : SecondsCountdownType, ref: ForwardedRef<any>) => {
    const [timeLeft, setTimeLeft] = useState<number>(seconds);

    useImperativeHandle(ref, () => ({
      resetTimer() {
          setTimeLeft(seconds);
      }
  }));

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete && onComplete();
            (onComplete && resetTimer ) && setTimeLeft(seconds)
          return;
        }
    
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(timer);
      }, [timeLeft, onComplete, resetTimer, seconds]);

      const formatTime = (time:number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }

      return (
        <>{formatTime(timeLeft)}</>
      );
})

export default SecondsCountdown;