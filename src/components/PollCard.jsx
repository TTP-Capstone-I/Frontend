import { useNavigate } from 'react-router'

function PollCard(props) {
    const navigate = useNavigate()
    const poll = props.poll
    const onDelete = props.onDelete
    const isDeleting = props.isDeleting
    const ownerToken = localStorage.getItem(`pollOwner:${poll.id}`);
    const isOwner = ownerToken !== null;
    const hasVoted = localStorage.getItem(`votedPoll${poll.id}`) !== null

    return (
        <article className="poll-card">
            <div className={hasVoted ? "poll-card-icon-voted" : "poll-card-icon"} aria-hidden="true">✓</div>
            <div className="poll-card-content">
                <div className="poll-title-row">
                    <h3>{poll.title}</h3>
                    {hasVoted && <span className="voted-badge">✓ Already Voted</span>}
                </div>
                {poll.description && <p>{poll.description}</p>}
            </div>
            <div className="poll-card-actions">
                {isOwner && (<button
                    className="delete-poll-button"
                    onClick={() => onDelete(poll)}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>)}
                {hasVoted ? (
                    <button className="view-results-button" onClick={() => navigate(`/results/${poll.id}`)} disabled={isDeleting}>
                        View Results <span aria-hidden="true">→</span>
                    </button>
                ) : (
                    <button className="view-poll-button" onClick={() => navigate(`/polls/${poll.id}`)} disabled={isDeleting}>
                        View Poll <span aria-hidden="true">→</span>
                    </button>
                )}
            </div>
        </article>
    )
}

export default PollCard
