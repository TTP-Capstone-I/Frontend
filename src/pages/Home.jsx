import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import PollCard from '../components/PollCard'
import axios from 'axios'

function Home() {
    const [polls, setPolls] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [deletingPollId, setDeletingPollId] = useState(null)
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

    async function handleDeletePoll(poll) {
        const confirmed = window.confirm(`Delete "${poll.title}"? This cannot be undone.`)
        if (!confirmed) return

        setDeleteError('')
        setDeletingPollId(poll.id)

        try {
            await axios.delete(URL + `/polls/${poll.id}`)
            setPolls((currentPolls) => currentPolls.filter((item) => item.id !== poll.id))
        } catch (error) {
            console.error(error)
            setDeleteError(
                error.response?.data?.message ||
                'The poll could not be deleted. Check that the backend supports DELETE /polls/:id.'
            )
        } finally {
            setDeletingPollId(null)
        }
    }

    return (
        <main className="content-page">
            <div className="page-heading">
                <span className="eyebrow">Choose a poll below or create a poll.</span>
                <h1>Polling App</h1>
            </div>

            <section className="poll-list" aria-labelledby="poll-list-heading">
                <div className="section-heading">
                    <div>
                        <h2 id="poll-list-heading">Available polls</h2>
                        <p>{polls.length} {polls.length === 1 ? 'poll' : 'polls'} ready for you</p>
                    </div>
                    <button className="create-shortcut" onClick={() => navigate('/create-poll')}>
                        + New poll
                    </button>
                </div>

                <div className="poll-grid">
                    {polls.map((poll) => (
                        <PollCard
                            key={poll.id}
                            poll={poll}
                            onDelete={handleDeletePoll}
                            isDeleting={deletingPollId === poll.id}
                        />
                    ))}
                    {polls.length === 0 && (
                        <div className="empty-polls">
                            <h3>No polls yet</h3>
                            <p>Create your first poll to get started.</p>
                        </div>
                    )}
                </div>
                {deleteError && <p className="delete-error" role="alert">{deleteError}</p>}
            </section>
        </main>
    )
}

export default Home
