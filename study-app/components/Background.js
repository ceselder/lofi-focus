import { useContext } from "react"
import { controlStateContext } from "../pages"
import dynamic from "next/dynamic"
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
    ssr: false,
})

export default function Background() {
    const [controlState, setControlState] = useContext(controlStateContext)
    return (<div>
        <ReactPlayer
            className='absolute top-0 -z-10 opacity-30 left-0 w-full h-full object-cover'
            playing={true}
            muted={true}
            loop={true}
            url='mp4/filters/vhs.mp4'
        />
        {controlState.transitionPlaying && (<ReactPlayer
            className='absolute -z-20 top-0 left-0 w-full h-full object-cover'
            playing={true}
            muted={true}
            loop={true}
            url='mp4/filters/vhs.mp4'
        />)}
        <ReactPlayer
            className='absolute -z-30 top-0 left-0 w-full h-full object-cover'
            playing={true}
            loop={true}
            muted={true}
            url={controlState.background}
        />
    </div>)
}