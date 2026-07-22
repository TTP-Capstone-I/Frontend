import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function ResultsCard(props) {
    const navigate = useNavigate()
    const option = props.option
    const totalVotes = props.totalVotes

    function calculateProgressPercent() {
        const voteAmount = option.votes.length
        const percentage = (voteAmount / totalVotes)
        return percentage
    }

    const percent = calculateProgressPercent()

    return (
        <>
            <h3 key={option.id}> {option.title}
            <br></br>
            <p> Votes: {option.votes.length}</p>
            <progress value={percent}></progress>
            </h3>
        </>
    )
}

export default ResultsCard
