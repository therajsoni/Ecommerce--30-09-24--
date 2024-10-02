import React, { useEffect, useState } from 'react'
import AdminSidebar from "../../components/AdminSidebar"

const formatTime = (timeInSeconds) => {
    const Hours = String(Math.floor(timeInSeconds/3600));
    const minutes = String(Math.floor((timeInSeconds%3600)/60));
    const seconds = String(Math.floor(timeInSeconds));

    const hoursInString = Hours.toString().padStart(2,"0");
    const minutesInString = minutes.toString().padStart(2,"0")
    const secondsInString = seconds.toString().padStart(2,"0")

    
    return `${hoursInString}:${minutesInString}:${secondsInString}`;
}

const StopWatch = () => {
    const [time,setTime] = useState(0)
    const [isRunning,setIsRunning] = useState(false)

    const resetHandler = () => {
        setTime(0);
        setIsRunning(false)
    }

    useEffect(()=>{
        let intervalId;
        if(isRunning)
        intervalId = setInterval(() => {
        setTime((prev)=>prev+1);    
        }, 1000);
        return () => {
            clearInterval(intervalId)
        }
    },[isRunning]);


  return (
    <div  className="admin-container">
    <AdminSidebar/>
    <main className='dashboard-app-container'>
    <h1>StopWatch</h1>
        <section>
            <div className='stopwatch'>
                <h2>{formatTime(time)}</h2>
                <button onClick={()=>setIsRunning((prev)=>!prev)}>{isRunning ? "Stop" : "Start"}</button>
                <button onClick={resetHandler} >Reset</button>
            </div>
        </section>
        </main>
        </div>
  )
}

export default StopWatch
