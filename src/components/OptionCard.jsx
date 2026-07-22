import { useState } from 'react'
import { useNavigate } from 'react-router'

function OptionCard(props) {
    const inputFunc = props.inputFunc
    const removeFunc = props.removeFunc
    const index = props.index
    //console.log(props)

    return (
        <>
            <input onChange={(event) => inputFunc(event, index)} placeholder={`Option ${index+1}`}></input>
            <button onClick={(event) => removeFunc(event, index)}> Remove </button>
            <br/>
        </>
    )
}

export default OptionCard
