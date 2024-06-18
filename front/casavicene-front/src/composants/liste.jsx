import "../style/liste.css"
function Liste(){
    return(
        <div className="liste">
            <div className="liste__recherche">
                <form className="search-form">
                    <label htmlFor="Search">Rech.</label>
                    <input type="text" id="search" name="search"/>
                </form>
            </div>
            <div className="check-list">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="liste-button">
                <button className="liste__button">Rech</button>
                <button className="liste__button">OK</button>
                <button className="liste__button">annuler</button>
            </div>
        </div>
    )
}

export default Liste