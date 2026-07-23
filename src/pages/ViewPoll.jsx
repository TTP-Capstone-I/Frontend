import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router'
import axios from 'axios'

function PollDetails(){
    const { id } = useParams()
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ error, setError ] = useState('')
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const navigate = useNavigate()

    const URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        async function getPoll() {
            try {
                const response = await axios.get(URL+`/polls/${id}?include=true`)
                if (!response || !response.data) {
                    throw new Error("Failed to load poll")
                }
                const data = await response.data
                if (!data) {
                    throw new Error("Failed to get polls")
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

    function handleSelect(optionId){
        setSelectedOption(optionId)
    }

    async function handleVote(){
        if (!selectedOption) return
        setSubmitting(true)
        setSubmitting('')
        try{
            const response = await axios.post(URL + `/votes` , {
                optionId : selectedOption
            })
            if(!response){
                throw new Error("Failed to add vote!", response.status)
            }
            navigate(`/results/${poll.id}`)
        }catch(error){
            console.log(error)
            setSubmitError(error)
        }finally{
            setSubmitting(false)
        }
    }

    if (loading) return <p> Loading Poll...</p>
    if (error) return <p> Error: {error.message}</p>
    if (!poll) return <p> Poll not found </p>
    console.log(poll)
    return (
        <>
            <Link to="/">← Back to Polls</Link>
            <h1>Title: {poll.title}</h1>
            <h3>Description: {poll.description}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {poll.options.map((option) => (
                    <li key={option.id}>
                        <button
                            onClick={() => handleSelect(option.id)}
                            style={{
                                border: option.id === selectedOption
                                    ? '2px solid dodgerblue'
                                    : '1px solid gray'
                            }}
                        >
                            {option.title}
                        </button>
                    </li>
                ))}
            </ul>
            <button 
                onClick={handleVote} 
                disabled={!selectedOption || submitting}
                style={{
                    padding: '4px 10px',
                    fontSize: '0.85rem',
                    alignSelf: 'center'
                }}
            >
                {submitting ? 'Submitting...' : 'Vote'}
            </button>
                
        </>
    )
}

export default PollDetails

