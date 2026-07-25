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
    const [searchTerm, setSearchTerm] = useState('')
    
    const navigate = useNavigate()
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

    // console.log(polls)

    async function handleDeletePoll(poll) {
        const confirmed = window.confirm(`Delete "${poll.title}"? This cannot be undone.`)
        if (!confirmed) return

        setDeleteError('')
        setDeletingPollId(poll.id)

        const ownerToken = localStorage.getItem(`pollOwner:${poll.id}`);
        if (!ownerToken) {
            setDeleteError("You do not own this poll.");
            return;
        }

        try {
            await axios.delete(URL + `/polls/${poll.id}`, {
                headers: {"x-owner-token": ownerToken}
            })
            localStorage.removeItem(`pollOwner:${poll.id}`);
            setPolls((currentPolls) => currentPolls.filter((item) => item.id !== poll.id))
        } catch (error) {
            console.error(error)
            setDeleteError(
                error.response?.data?.message ||
                "You are not authorized to delete this poll."
            )
        } finally {
            setDeletingPollId(null)
        }
    }

    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase()
        setSearchTerm(searchTerm)
    }

    const filteredPolls = polls.filter((poll) => {
        return poll.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <main className="content-page">
            <div className="page-heading home-heading">
                <h1>Polling App</h1>
                <p>Choose a poll below or create a new one.</p>
            </div>

            <section className="poll-list" aria-labelledby="poll-list-heading">
                <div className="section-heading">
                    <div>
                        <h2 id="poll-list-heading">Available Polls</h2>
                        <p>{filteredPolls.length} {filteredPolls.length === 1 ? 'Poll' : 'Polls'} ready for you</p>
                    </div>
                    <input className="search-polls" onChange={(e) => handleSearch(e)} placeholder="Search Polls..." />
                    <button className="create-shortcut" onClick={() => navigate('/create-poll')}>
                        + New Poll
                    </button>
                </div>

                <div className="poll-grid">
                    {filteredPolls.map((poll) => (
                        <PollCard
                            key={poll.id}
                            poll={poll}
                            hidden={poll.hidden}
                            onDelete={handleDeletePoll}
                            isDeleting={deletingPollId === poll.id}
                        />
                    ))}
                    {filteredPolls.length === 0 && (
                        <div className="empty-polls">
                            <h3>No Polls Found</h3>
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
