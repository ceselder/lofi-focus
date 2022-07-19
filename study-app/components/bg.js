export default function Bg()
{
    return (<div>
        <video className='absolute top-0 -z-10 opacity-40 left-0 w-full h-full object-cover' autoPlay loop muted>
            <source src='bg/vhs.mp4' type='video/mp4' />
        </video>
        <video className='absolute -z-20 top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
            <source src='bg/train.mp4' type='video/mp4' />
        </video>
    </div>)
}