import { useNavigate } from 'react-router'

function PollCard(props) {
    const navigate = useNavigate()
    const poll = props.poll
    const onDelete = props.onDelete
    const isDeleting = props.isDeleting
    const ownerToken = localStorage.getItem(`pollOwner:${poll.id}`);

    const isOwner = ownerToken !== null;
    console.log(poll)

    function handleClick() {
        navigate(`/polls/${poll.id}`)
        //useNavigate(`/polls/${poll.id}`)
    }

    return (
        <article className="poll-card">
            <div className="poll-card-icon" aria-hidden="true">✓</div>
            <div className="poll-card-content">
                <h3>{poll.title}</h3>
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
                <button className="view-poll-button" onClick={handleClick} disabled={isDeleting}>
                    View poll <span aria-hidden="true">→</span>
                </button>
            </div>
        </article>
    )
}

export default PollCard
