import { useContext } from "react"
import { controlStateContext } from "../pages"

export default function Background({ background })
{
    const [controlState, setControlState] = useContext(controlStateContext)
    return (<div>
        <video className='absolute top-0 -z-10 opacity-30 left-0 w-full h-full object-cover' autoPlay loop muted>
            <source src='mp4/filters/vhs.mp4' type='video/mp4' />
        </video>
        {controlState.transitionPlaying && (<video key={controlState.transitionPlaying} muted className='absolute -z-20 top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
            <source src='mp4/filters/transition.mp4' type='video/mp4' />
        </video>)}
        
        <video key={controlState.background} muted className='absolute -z-30 top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
            <source src={controlState.background} type='video/mp4' />
        </video>
    </div>)
}