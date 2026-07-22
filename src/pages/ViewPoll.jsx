import { useState, useEffect } from 'react'
import { useParams, Link} from 'react-router'
import axios from 'axios'

function PollDetails(){
    const { id } = useParams()
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ error, setError ] = useState('')

    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function getPoll() {
            try {
                const response = await axios.get(URL+`/polls/${id}?include=true`)
                if (!response || !response.data) {
                    throw new Error("Failed to load poll")
                }
                // const data = await response.data
                // if (!data) {
                //     throw new Error("Failed to get polls")
                // }
                setPoll(response.data)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }

        }

        getPoll()
    }, [id])

    if (loading) return <p> Loading Poll...</p>
    if (error) return <p> Error: {error.message}</p>
    if (!poll) return <p> Poll not found </p>
    console.log(poll)
    return (
        <>
            <Link to="/">← Back to Polls</Link>
            <h1>{poll.title}</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {poll.options.map((option) => (
                    <li key={option.id}>
                        <button>{option.title}</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PollDetails

