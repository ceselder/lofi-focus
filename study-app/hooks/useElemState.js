export default function useElemState(name, setState)
{
    function hook(func)
    {
        setState(old =>
            {
                const newState = {...old}
                newState[name] = func(newState[name])
                return newState
            })
    }
    return hook
}