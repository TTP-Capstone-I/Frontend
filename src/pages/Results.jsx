import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import ResultsCard from '../components/ResultsCard'
import axios from 'axios'

function Results() {
    const [poll, setPoll] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const params = useParams()
    const pollId = Number(params.id)
    const URL = import.meta.env.VITE_API_URL

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
        <main className="page-wrapper results-page">
            <section className="card results-card">
                <header className="card-header results-header">
                    <span className="results-label">Poll results</span>
                    <h1>{poll.title}</h1>
                    <p>{poll.description}</p>
                </header>

                <div className="card-body results-body">
                    <div className="results-summary">
                        <h2>Current standings</h2>
                        <span>{totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} total</span>
                    </div>

                    <div className="results-list">
                        {poll.options.map((option) => (
                            <ResultsCard key={option.id} option={option} totalVotes={totalVotes} />
                        ))}
                    </div>
                </div>

                <footer className="card-footer results-footer">
                    <Link to="/">← Back to Polls</Link>
                </footer>
            </section>
        </main>
    )
}

export default Results
