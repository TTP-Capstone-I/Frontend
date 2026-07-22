import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import PollCard from '../components/PollCard'
import axios from 'axios'

function Home() {
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // URL later from Render when we deploy.
    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function getPolls() {
            try {
                const response = await axios.get(URL+`/polls?include=true`)
                if (!response) {
                    throw new Error("Failed to load polls:", response.status)
                }
                const data = await response.data
                if (!data) {
                    throw new Error("Failed to get polls:", response.status)
                }
                setPolls(data)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        getPolls()
    }, [])

    if (loading) return <p> Loading Polls... </p>
    if (error) return <p> Error: {error.message} </p>

    console.log(polls)

    return (
        <>
        <h1> Polling App </h1>
        <h2> Polls: </h2>
            {polls.map((poll) => {
                return (
                    <PollCard key={poll.id} poll={poll} ></PollCard>
                )
            })}
        </>
    )
}

export default Home
