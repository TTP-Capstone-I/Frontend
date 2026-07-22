import { useState } from 'react'
import { useNavigate } from 'react-router'

function PollCard(props) {
    const navigate = useNavigate()
    const poll = props.poll
    console.log(poll)

    function handleClick() {
        navigate(`/polls/${poll.id}`)
        //useNavigate(`/polls/${poll.id}`)
    }

    return (
        <>
            <h3 key={poll.id}>
                {poll.title}
                <br></br>
                <button onClick={handleClick}> View Poll </button>
            </h3>
        </>
    )
}

export default PollCard
