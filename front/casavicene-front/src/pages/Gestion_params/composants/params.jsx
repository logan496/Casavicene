import "../styles/params.css"
function params() {
    return(
        <div className="params-container">
            <form className="params-form">
                <label htmlFor="Params">Paramétres</label>
                <input type="text" id="params" name="params"/>
            </form>
        </div>
    )
}

export default params