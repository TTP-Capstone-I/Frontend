import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import axios from 'axios'

function PollDetails() {
    const { id } = useParams()
    const voteStorageKey = `votedPoll${id}`
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    // Checks the local storage to see if an entry for this specific poll exists to tell if someone has voted or not.
    const [hasVoted, setHasVoted] = useState(() => {
        return localStorage.getItem(voteStorageKey) !== null
    })
    const navigate = useNavigate()

    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function getPoll() {
            try {
                const response = await axios.get(URL + `/polls/${id}?include=true`)
                if (!response || !response.data) {
                    throw new Error("Failed to get poll")
                }
                const data = await response.data
                if (!data) {
                    throw new Error("Failed to get poll")
                }
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

    function handleSelect(optionId) {
        setSelectedOption(optionId)
    }

    async function handleVote(event) {
        if (!selectedOption || submitting)  {
            return
        }

        // Check localStorage again to see if its value has changed
        if (localStorage.getItem(voteStorageKey) !== null) {
            setHasVoted(true)
            return
        }

        setSubmitting(true)
        setSubmitError('')

        try {
            const response = await axios.post(URL + `/votes`, {
                optionId: selectedOption
            })
            if (!response || !response.data) {
                throw new Error("Failed to add vote!", response.status)
            }

            // If vote was successful add it to localStorage
            localStorage.setItem(
                voteStorageKey,         // A string like: `votedPoll${id}`
                String(selectedOption)  // A string of the optionId
            )
            
            setHasVoted(true)
            navigate(`/results/${poll.id}`)
        } catch (error) {
            console.log(error)
            setSubmitError(error)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <p> Loading Poll...</p>
    if (error) return <p> Error: {error.message}</p>
    if (!poll) return <p> Poll not found </p>

    console.log(poll)

    return (
        <div className="page-wrapper">
            <div className="card">
                <div className="card-header">
                    <h1>{poll.title}</h1>
                </div>
                <div className="card-body">
                    <p>{poll.description}</p>
                    {poll.options.map((option) => (
                        <button
                            key={option.id}
                            disabled={hasVoted || submitting}
                            className={`option-bar ${option.id === selectedOption ? 'selected' : ''}`}
                            onClick={() => handleSelect(option.id)}
                        >
                            {option.title}
                        </button>
                    ))}
                    <button
                        className="vote-button"
                        onClick={handleVote}
                        disabled={!selectedOption || submitting}
                    >
                        {submitting ? 'Submitting...' : 'Vote'}
                    </button>
                    {submitError && <p>Error: {submitError.message}</p>}
                </div>

                {hasVoted && (
                    <div className="card-body">
                        <h2> You already voted on this poll. </h2>
                        <Link to={`/results/${poll.id}`}> View Results → </Link>
                    </div>  
                )}
                <div className="card-footer">
                    <Link to="/">← Back to Polls </Link>
                </div>
            </div>
        </div>
    )
}

export default PollDetails

