import React, { useContext, useState, useEffect } from 'react'
import { controlStateContext } from '../pages'
import { getTimeStr } from './Pomodoro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMouseHold } from '../hooks/useMouseHold'

const delta = 60



export default function PomodoroSettings() {
    const [controlState, setControlState] = useContext(controlStateContext)
    const [focusTimeStr, setFocusTimeStr] = useState(getTimeStr(controlState.timer.focusTime))
    const [breakTimeStr, setBreakTimeStr] = useState(getTimeStr(controlState.timer.breakTime))

    function changeTime(add, timeType) {
        setControlState(oldState => {
            const newState = { ...oldState }
            const change = (add ? delta : (-1 * delta))
            if (newState.timer[timeType] + change > delta) {
                newState.timer[timeType] += change
            }
            return newState
        })
    }


    const [focusTimeIncreaseDown, focusTimeIncreaseUp] = useMouseHold(() => changeTime(true, "focusTime"))
    const [focusTimeDecreaseDown, focusTimeDecreaseUp] = useMouseHold(() => changeTime(false, "focusTime"))
    const [breakTimeIncreaseDown, breakTimeIncreaseUp] = useMouseHold(() => changeTime(true, "breakTime"))
    const [breakTimeDecreaseDown, breakTimeDecreaseUp] = useMouseHold(() => changeTime(false, "breakTime"))

    useEffect(() => {
        setBreakTimeStr(getTimeStr(controlState.timer.breakTime))
    }, [controlState.timer.breakTime])

    useEffect(() => {
        setFocusTimeStr(getTimeStr(controlState.timer.focusTime))
    }, [controlState.timer.focusTime])

    return (
        <><p className="text-4xl font-extrabold underline">Settings</p>
            <p className='font-bold'>Focus time: </p>
            <div className='flex flex-row gap-2'>
                <p className='select-none'>{focusTimeStr}</p>
                <FontAwesomeIcon
                    onMouseDown={focusTimeIncreaseDown}
                    onMouseLeave={focusTimeIncreaseUp}
                    onMouseUp={focusTimeIncreaseUp}
                    className='w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg'
                    icon={faPlus} />
                    <FontAwesomeIcon
                    onMouseDown={focusTimeDecreaseDown}
                    onMouseLeave={focusTimeDecreaseUp}
                    onMouseUp={focusTimeDecreaseUp}
                    className='w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg'
                    icon={faMinus} />
            </div>
            <p>Break time: </p>
            <div className='flex flex-row gap-2'>
                <p className='select-none'>{breakTimeStr}</p>
                <FontAwesomeIcon
                onMouseDown={breakTimeIncreaseDown}
                onMouseLeave={breakTimeIncreaseUp}
                onMouseUp={breakTimeIncreaseUp}
                    className='w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg'
                    icon={faPlus} />
                <FontAwesomeIcon
                onMouseDown={breakTimeDecreaseDown}
                onMouseLeave={breakTimeDecreaseUp}
                onMouseUp={breakTimeDecreaseUp}
                    className='w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg'
                    icon={faMinus} />
            </div>
            <p>Play Sound? </p>
            <div className='justify-center flex flex-row gap-2'>
                <FontAwesomeIcon
                    className={`${controlState.timer.playSound ? 'bg-white text-black' : ''} w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg`}
                    icon={faCheck} />
                <FontAwesomeIcon
                    className={`${controlState.timer.playSound ? '' : 'bg-white text-black'} w-4 h-4 p-1 hover:cursor-pointer hover:bg-white hover:text-black border-2 border-white rounded-lg`}
                    icon={faXmark} />
            </div>
        </>

    )
}
