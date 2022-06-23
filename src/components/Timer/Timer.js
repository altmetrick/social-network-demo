import { useState, useEffect } from 'react';

const Timer = (props) => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);
  console.log(timer, ' from Func');
  useEffect(() => {
    let interval;

    if (isOn) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
        console.log(timer);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOn]);

  const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };

  return (
    <div>
      <div>Timer</div>
      <div>{timer}</div>
      <div>
        {!isOn && (
          <div>
            <button onClick={() => setIsOn(true)}>Turn On</button>
          </div>
        )}

        {isOn && (
          <div>
            <button onClick={() => setIsOn(false)}>Turn Off</button>
          </div>
        )}
      </div>
      <div>
        <button onClick={onReset} disabled={timer === 0}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
