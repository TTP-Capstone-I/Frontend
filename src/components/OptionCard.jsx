function OptionCard(props) {
    const inputFunc = props.inputFunc
    const removeFunc = props.removeFunc
    const disableRemove = props.disableRemove
    const index = props.index
    //console.log(props)

    return (
        <div className="option-input-row">
            <span className="option-number">{index + 1}</span>
            <input onChange={(event) => inputFunc(event, index)} placeholder={`Option ${index + 1}`} />
            <button
                className="remove-option-button"
                type="button"
                disabled={disableRemove}
                onClick={(event) => removeFunc(event, index)}
                aria-label={`Remove option ${index + 1}`}
            >
                ×
            </button>
        </div>
    )
}

export default OptionCard
