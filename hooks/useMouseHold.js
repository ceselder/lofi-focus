import { useEffect, useState } from "react"

export function useMouseHold(func, holdTime = 500, fireInterval = 100) {
    const [mouseDown, setMouseDown] = useState(false)
    const [holdCancelled, setHoldCancelled] = useState(false)
    const [mouseHeld, setMouseHeld] = useState(false)

    const mouseDownFunction = () => { setMouseDown(true); }
    const mouseUpFunction = () => { setHoldCancelled(true); setMouseDown(false); }

    useEffect(() => {
        if (mouseDown) {
            func()
            const timeout = setTimeout(() => {
                setMouseDown(newMouseDown => {
                    if (newMouseDown) {
                        setMouseHeld(true)
                    }
                    return newMouseDown
                })
                return clearTimeout(timeout)
            }, holdTime)
            /*useEffect(() => { //double register fix
                if (holdCancelled)
                {
                    clearTimeout(timeout)
                }
            }, [holdCancelled])*/
        }
        else {
            setMouseHeld(false)
        }
    }, [mouseDown])

    useEffect(() => {
        if (mouseHeld) {
            const interval = setInterval(() => {
                func()
                setMouseHeld(held => {
                    if (!held) {
                        return clearInterval(interval)
                    }
                    return held
                })
            }, fireInterval)
        }
    }, [mouseHeld])

    return [mouseDownFunction, mouseUpFunction]
}