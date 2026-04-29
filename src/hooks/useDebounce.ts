import { useEffect, useState } from "react"

export const useDebounce = (value:string, delay:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
           setDebouncedValue(value) 
        }, 500)

        return ()=> clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}