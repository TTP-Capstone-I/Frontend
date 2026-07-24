function ResultsCard(props) {
    const option = props.option
    const totalVotes = props.totalVotes

    function calculateProgressPercent() {
        const voteAmount = option.votes.length
        const percentage = totalVotes === 0 ? 0 : (voteAmount / totalVotes) * 100
        return percentage
    }

    const percent = calculateProgressPercent()

    return (
        <article className="result-item">
            <div className="result-item-heading">
                <h3>{option.title}</h3>
                <span>{Math.round(percent)}%</span>
            </div>
            <div
                className="result-progress"
                role="progressbar"
                aria-label={`${option.title}: ${Math.round(percent)} percent`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={Math.round(percent)}
            >
                <span style={{ width: `${percent}%` }} />
            </div>
            <p>{option.votes.length} {option.votes.length === 1 ? 'vote' : 'votes'}</p>
        </article>
    )
}

export default ResultsCard
