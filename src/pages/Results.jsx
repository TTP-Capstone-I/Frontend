import { useState, useEffect } from 'react'
import { Link, Routes, Route, useNavigate, useParams } from 'react-router'
import ResultsCard from '../components/ResultsCard'
import axios from 'axios'

function Results(props) {
    const [poll, setPoll] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const params = useParams()
    const navigate = useNavigate()

    // URL later from Render when we deploy.
    const URL = import.meta.env.VITE_API_URL
    const pollId = Number(params.id)

    useEffect(() => {
        async function getPoll() {
            try {
                const response = await axios.get(URL+`/polls/${pollId}?include=true`)
                if (!response) {
                    throw new Error("Failed to load polls:", response.status)
                }
                const data = await response.data
                if (!data) {
                    throw new Error("Failed to get polls:", response.status)
                }
                setPoll(data)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        getPoll()
    }, [])

    if (loading) return <p> Loading Poll... </p>
    if (error) return <p> Error: {error.message} </p>

    console.log(poll)

    function calculateTotalVotes() {
        let result = 0
        poll.options.map((option) => {
            result+=option.votes.length
        })
        return result
    }

    const totalVotes = calculateTotalVotes()

    return (
        <>
            <Link to="/">← Back to Polls </Link>
            <h2> Title: {poll.title} </h2>
            <h3> Description: {poll.description} </h3>
            {poll.options.map((option) => {
                return (
                    <ResultsCard key={option.id} option={option} totalVotes={totalVotes} > </ResultsCard>
                )
            })}
        </>
    )
}

export default Results
