import "../style/form1.css"
function Form1(){
    return(
        <div className="contener-rubrique">
            <form className="contener-rubrique__form">
                <div className="contener__rubrique">
                    <label>Rubrique de soins</label>
                    <input type="text" className="rubrique_soins"/>

                    <label>Familles d'actes</label>
                    <input type="text" className="famille_acte"/>
                </div>

                <div className="contener__rubrique">
                    <label>Actes</label>
                    <input type="text" className="acte"/>

                    <button className="criteres_button">Critéres</button>
                </div>
            </form>
        </div>
    )
}

export default Form1