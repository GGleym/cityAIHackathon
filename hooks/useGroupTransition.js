import {useEffect, useState} from "react"

export const useGroupTransition = (isMounted, unmountDelay) => {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(null)

    useEffect(() => {
        let timeoutId

        if (isMounted && !hasTransitionedIn) {
            setHasTransitionedIn(true)
        } else if (!isMounted && hasTransitionedIn) {
            timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay)
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [unmountDelay, isMounted, hasTransitionedIn])

    return hasTransitionedIn
}