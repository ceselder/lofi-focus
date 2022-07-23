import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { controlStateContext } from '../pages'

export default function Pomodoro() {
    const [controlState, setControlState] = useContext(controlStateContext);
    const [time, setTime] = useState(controlState.timer.focusTime)
    const [timeStr, setTimeStr] = useState(getTimeStr(controlState.timer.focusTime));
    const [timerPaused, setTimerPaused] = useState(true)
    const [isBreakTime, setIsBreakTime] = useState(false)

    const [intervalFunction, setIntervalFunction] = useState(() => null );

    function getTimeStr(time)
    {
        const hourOffset = 60 * 60 //compiler probably optimizes this but whatever
        const minuteOffset = 60

        let currentTime = time
        let hours = 0
        let minutes = 0
        let seconds = 0

        while(currentTime >= hourOffset)
        {
            currentTime -= hourOffset;
            hours++
        }
        while(currentTime >= minuteOffset)
        {
            currentTime -= minuteOffset;
            minutes++
        }
        seconds = currentTime

        console.log(hours, minutes, seconds)

        return (`${(hours == 0) ? '' : `${hours}:`}${minutes}:${seconds}`)
    }


    function countDownFunction() {
            if (!timerPaused)
            {
                setTime(oldTime => {
                    const newTime = oldTime - 1;
                    setTimeStr(getTimeStr(newTime))
                    return newTime
                })
            }
    }

    function startTimer() {
        setIntervalFunction(countDownFunction)
        setTimerPaused(false)
    }

    function pauseTimer() {
        setIntervalFunction(old => { clearInterval(old); return (() => (null)) })
        setTimerPaused(true)
    }

    function toggleTimer() {
        if (timerPaused)
        {
            startTimer()
        }
        else
        {
            pauseTimer()
        }
    }

    return (
        <>
            <AnimatePresence>
                {controlState.timer.enabled && (
                    <motion.div
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-2xl font-bold"
                    >
                        <div className="text-2xl">
                            <p className="text-4xl font-extrabold underline">
                                Pomodoro
                            </p>
                            <div>
                                {timeStr}
                            </div>
                        </div>
                        <div onClick={toggleTimer} className="hover:bg-white p-2 hover:text-black hover:cursor-pointer mx-1 inline-block border-white border-2 px-1 rounded-lg">
                            {timerPaused ? 'Start' : 'Pause'} Timer
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
