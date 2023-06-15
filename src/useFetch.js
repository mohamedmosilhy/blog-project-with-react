import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending ]= useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortcont = new AbortController()

        setTimeout(() => {
            fetch(url, {signal: abortcont.signal}).then(
                res => {
                    if(!res.ok){
                        throw Error("could not fetch the data from this resource")
                    }
                    return res.json()
                })
                .then(
                    data =>{
                        setData(data)
                        setIsPending(false)
                        setError(null)
                    }).catch(err => {
                        if (err.name === "AbortError") {
                            console.log("AbortError")
                        } else {
                            setError(err.message)
                            setIsPending(false) 
                        }

                    })
        },1000)
            return () => abortcont.abort 
        },[url])

    return {data, isPending, error}
}

export default useFetch;