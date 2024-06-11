import "../styles/Memo.css"
function Memo() {
    return(
        <div className="memo-container">
            <form className="memo-form">
                <label htmlFor="Memo">Memo</label>
                <input type="text" id="memo" name="memo"/>
            </form>
        </div>
    )
}

export default Memo