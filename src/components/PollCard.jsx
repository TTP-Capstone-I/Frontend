import { useNavigate } from 'react-router'

function PollCard(props) {
    const navigate = useNavigate()
    const poll = props.poll
    const onDelete = props.onDelete
    const isDeleting = props.isDeleting
    const hasVoted = localStorage.getItem(`votedPoll${poll.id}`) !== null
    console.log(poll)

    function handleClick() {
        navigate(`/polls/${poll.id}`)
        //useNavigate(`/polls/${poll.id}`)
    }

    return (
        <article className="poll-card">
            <div className="poll-card-icon" aria-hidden="true">✓</div>
            <div className="poll-card-content">
                <div className="poll-title-row">
                    <h3>{poll.title}</h3>
                    {hasVoted && <span className="voted-badge">✓ Already voted</span>}
                </div>
                {poll.description && <p>{poll.description}</p>}
            </div>
            <div className="poll-card-actions">
                <button
                    className="delete-poll-button"
                    onClick={() => onDelete(poll)}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button className="view-poll-button" onClick={handleClick} disabled={isDeleting}>
                    View poll <span aria-hidden="true">→</span>
                </button>
            </div>
        </article>
    )
}

export default PollCard
