import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal';


export default function TimerChallenge({ title, targetTime }) {
  // this ref will store the setTimeOutTimer; as we need it later to stop the timer
  const timer =useRef();

  //this ref used in ResultModal to pop up it
  const dialog = useRef();
  //to identify how much time is remaining
  const[timeRemaining, setTimeRemaining] = useState(targetTime*1000)

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000 ;

  if(timeRemaining <= 0){
    clearInterval(timer.current);
    
    dialog.current.open();
  }
  
  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }
 

  //Function to start the Challenge
  function handleStart() {
    
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining-10)
    }, 10)
    //setInterval will execute in every 10 mili seconds
   
  }

  //to stop the timer 
  function handleStop() {
    dialog.current.open();
    //to stop the timer js has a clearInterval()
    clearInterval(timer.current);
  }

  return <>

  {/* Result Modal should only display when the timer Expired */}

  <ResultModal targetTime={targetTime}  ref={dialog} remainingTime={timeRemaining} onReset={handleReset}  />
  <section className='challenge'>
    <h2>{title}</h2>
    <p className='challenge-time'>
      {targetTime} second {targetTime > 1 ? 's' : ""}
    </p>
    <p>

      {/* we will check if the timerStarted is truthy then call stopHandle otherwise startHandle */}
      <button onClick={timerIsActive? handleStop: handleStart}> {timerIsActive ? 'stop' : 'start'} Challenge</button>
    </p>
    <p className={timerIsActive ? 'active' : undefined}>
      {/* check if timer has started then it should display timer is Running */}
      {timerIsActive ? 'Timer is Running...' : 'Timer Inactive'}
    </p>
  </section>
  </>
}