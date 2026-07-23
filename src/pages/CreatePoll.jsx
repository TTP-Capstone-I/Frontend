import { useState, useEffect } from 'react'
import { useParams, Link} from 'react-router'
import OptionCard from '../components/OptionCard'
import axios from 'axios'

function CreatePollForm(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([{title: ""}, {title: ""}])

    const URL = import.meta.env.VITE_API_URL

    function handleSubmit(event) {
        event.preventDefault()
        //console.log(event)
    }

    function addNewOption(event) {
        // event.preventDefault()   // This isn't really needed here     
        setOptions((prev) => {
            return [...prev, {
                title: ""
            }]
        })
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
        console.log(options)
    }

    function IsMaxOptions() {
        return (options.length >= 5 ? true : false)
    }

    function IsMinOptions() {
        console.log(options.length <= 2 ? true : false)
        return (options.length <= 2 ? true : false)
    }
 
    return (
        <>
            <Link to="/"> ← Back to Polls </Link>
            <form onSubmit={(event) => handleSubmit(event)}> 
                <h1> Create a new Poll </h1>

                <input onChange={(event) => handleTitleInput(event)} placeholder='Title' />
                <br/>
                <input onChange={(event) => handleDescInput(event)} placeholder='Description' />


                <p> Options: </p>
                <br/>

                {options.map((option, index) => {
                    return <OptionCard disableRemove={IsMinOptions()} index={index} inputFunc={handleOptionInput} removeFunc={deleteOption} key={index}/>
                })}

                <button disabled={IsMaxOptions()} onClick={(event) => addNewOption(event)}> + Add Option </button>
                <br/>
                <button onClick={(event) => handleSubmit(event)}> Create Poll </button>
            </form>
        </>
    )
}

export default CreatePollForm

