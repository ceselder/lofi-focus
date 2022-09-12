import React, { useRef, useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { controlStateContext } from '../pages'
import { useFirstRender } from '../hooks/useFirstRender'
import PomodoroSettings from './PomodoroSettings'

export function getTimeStr(time) {
    const hourOffset = 60 * 60
    const minuteOffset = 60

    let currentTime = time
    let hours = 0
    let minutes = 0
    let seconds = 0

    while (currentTime >= hourOffset) {
        currentTime -= hourOffset;
        hours++
    }
    while (currentTime >= minuteOffset) {
        currentTime -= minuteOffset;
        minutes++
    }
    seconds = currentTime

    return (`${(hours == 0) ? '' : `${(hours > 9) ? hours : `0${hours}`}:`}${(minutes > 9) ? minutes : `0${minutes}`}:${(seconds > 9) ? seconds : `0${seconds}`}`)
}

export default function Pomodoro() {
    const [controlState, setControlState] = useContext(controlStateContext);
    const [time, setTime] = useState(controlState.timer.focusTime)
    const [timeStr, setTimeStr] = useState(getTimeStr(controlState.timer.focusTime));
    const [timerPaused, setTimerPaused] = useState(true);
    const [isBreakTime, setIsBreakTime] = useState(false)
    const [isSettingsOpen, setSettingsOpen] = useState(false)
    const firstRender = useFirstRender();

    const [focusAlert] = useState(typeof Audio !== "undefined" && new Audio('/mp3/timer_alert_break.mp3'));
    const [breakAlert] = useState(typeof Audio !== "undefined" && new Audio('/mp3/timer_alert_work.mp3'));

    const settingsVariants = {
        open: { x: 30, y: 10, rotate: 0 },
        closed: { x: 30, y: 10, rotate: 90 },
    }

    useEffect(() => {
        if (!firstRender) {
            if (isBreakTime) {
                setTime(controlState.timer.breakTime)
                focusAlert.play()
            }
            else {
                setTime(controlState.timer.focusTime)
                breakAlert.play()
            }
        }
    }, [isBreakTime])

    useEffect(() =>
        setTimeStr(getTimeStr(time))
        , [time])

    useEffect(() => {
        setTimerPaused(controlState.timer.enabled);
    }, [controlState.timer.enabled])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((oldTime) => {
                if (timerPaused === false) {
                    const newTime = oldTime - 1;
                    if (newTime <= 0) {
                        setIsBreakTime(isBreak => !isBreak)
                        setTimerPaused(true)
                        return newTime
                    }
                    return newTime
                }
                return oldTime;
            })
        }, 1000)
        return () => { clearInterval(interval); };
    }, [timerPaused])

    return (
        <>
            <AnimatePresence>
                <div className='flex flex-col'>
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
                                <motion.div
                                    animate={isSettingsOpen ? "open" : "closed"}
                                    variants={settingsVariants}
                                    initial={{ x: 30, y: 10, rotate: 0 }}
                                    onClick={() => setSettingsOpen(isOpen => !isOpen)}
                                    className='hover:cursor-pointer absolute right-0 top-0 fill-white w-6 translate-y-2.5 translate-x-7'>
                                    <img src='img/settings.svg' />
                                </motion.div>

                                <div className={`${isBreakTime ? 'text-green-500' : 'text-red-500'}`}>
                                    {timeStr}
                                </div>
                            </div>
                            <div onClick={() => setTimerPaused(bool => !bool)} className="hover:bg-white p-2 hover:text-black hover:cursor-pointer inline-block border-white border-2 rounded-lg">
                                {`${timerPaused ? 'Start' : 'Pause'} Timer`}
                            </div>

                            {isSettingsOpen && (
                                <motion.div
                                    exit={{ opacity: 0 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="pt-2 text-2xl font-bold"
                                >
                                    <PomodoroSettings />
                                </motion.div>
                            )}
                        </motion.div>)}
                </div>
            </AnimatePresence>
        </>
    )
}
