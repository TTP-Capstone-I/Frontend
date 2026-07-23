import { useState, useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router'
import OptionCard from '../components/OptionCard'
import axios from 'axios'

function CreatePollForm(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([{title: ""}, {title: ""}])
    const [msg, setMsg] = useState('')
    const [creatingPoll, setCreatingPoll] = useState(false)

    const URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    function validSubmission() {
        // Debug
        // console.log("Title:", title)
        // console.log("Description:", description)

        if (title.length === 0 || description.length === 0) {
            setMsg("Error: Title and description must not be empty.")
            return false
        }

        for (let i = 0; i < options.length; i++) {
            const option = options[i]
            // console.log(`Option #${(i+1)}: ${option.title}`)
            if (option.title.length === 0) {
                setMsg("Error: All options must not be be empty.")
                return false
            } 
        }
        
        setMsg("")
        setCreatingPoll(true)
        return true
    }

    // Verify to check if every input is correct then make a post request to the backend server
    async function handleSubmit(event) {
        event.preventDefault()

        const result = validSubmission()
        if (result === false) {
            return
        }
        
        const requestBody = {
            title: title,               // String
            description: description,   // String
            options: options,           // Object ~ {title: "Option #1", title: "Option #2"}
        }
        console.log(requestBody)
        const response = await axios.post(URL+`/polls`, requestBody)
        if (!response) {
            throw new Error("Failed to load polls:", response.status)
        }
        setCreatingPoll(false)
        navigate(`/polls/${response.data.id}`)
    }

    function addNewOption(event) {
        event.preventDefault()  // This is needed!
        setOptions((prev) => {
            return [...prev, {
                title: ""
            }]
        })
        return 
    } 

    function deleteOption(event, index) {
        // event.preventDefault()    // This isn't really needed here
        if (IsMinOptions()) {
            return  // Don't allow the user to delete if theres only two options.
        } 

        const updatedOptions = options.filter((option, i) => {
            return i !== index
        })
        setOptions(updatedOptions)
    } 

    function handleTitleInput(event) {
        event.preventDefault()   
        const input = event.target.value
        setTitle(input)
    }

    function handleDescInput(event) {
        event.preventDefault()   
        const input = event.target.value
        setDescription(input)
    }

    function handleOptionInput(event, index) {
        event.preventDefault()   
        const input = event.target.value

        const newOptions = options.map((option, i) => {
            if (index === i) {
                option['title'] = input
            }
            return option
        })

        setOptions(newOptions)
    }

    // Check to see if theres a maximum of 5 options
    function IsMaxOptions() {
        return (options.length >= 5 ? true : false)
    }

    // Check to see if theres a minimum of 2 options
    function IsMinOptions() {
        return (options.length <= 2 ? true : false)
    }
 
    return (
        <>
            <Link to="/"> ← Back to Polls </Link>
            <form onSubmit={(event) => handleSubmit(event)}> 
                <h1> Create a New Poll </h1>

                <input onChange={(event) => handleTitleInput(event)} placeholder='Title' />
                <br/>
                <input onChange={(event) => handleDescInput(event)} placeholder='Description' />

                <p> - Options - </p>
                <br/>

                {options.map((option, index) => {
                    return <OptionCard disableRemove={IsMinOptions()} index={index} inputFunc={handleOptionInput} removeFunc={deleteOption} key={index}/>
                })}

                <button disabled={IsMaxOptions()} onClick={(event) => addNewOption(event)}> + Add Option </button>
                <br/>
                <button onClick={(event) => handleSubmit(event)}> Create Poll </button>

                <p hidden={(msg.length === 0)} style={{color: 'red'}}> 
                    {msg} 
                </p>
                <p hidden={!creatingPoll}> Creating Poll... </p>
            </form>
        </>
    )
}

export default CreatePollForm

