import "../style/clientForm-3.css"
function clientForm3(){
    return(
        <div className="client-form3">
            <form className="client__form3">
                <div className="form-group3">
                    <label htmlFor="Num_contribuable">N° contribuable</label>
                    <input type="text" id="num_contribuable" name="num_contribuable"/>
                </div>
                <div className="form-group3">
                    <label htmlFor="Num_RC">N° RC</label>
                    <input type="text" id="num_rc" name="num_rc"/>
                </div>
                <div className="form-group3">
                    <label htmlFor="Echeance">Echeance</label>
                    <input type="text" id="echeance" name="echeance"/>
                </div>
                {/*faire une liste déroulante pour le taux TVA*/}
                <div className="form-group3">
                    <label htmlFor="Taux_TVA">Taux TVA</label>
                    <input type="number" id="taux_tva" name="fax"/>
                </div>

                {/*faire une liste déroulante pour le mode de réglement*/}
                <div className="form-group3">
                    <label htmlFor="Mode_reglement">Mode Réglement</label>
                    <input type="" id="tel" name="tel"/>
                </div>

                <div className="form-group3">
                    <label htmlFor="Email"></label>
                    <input type="email" id="email" name="email"/>
                </div>
                <div className="form-group3">
                    <label htmlFor="Adresse"></label>
                    <input type="text" id="adresse" name="adresse"/>
                </div>
                <div className="form-group3">
                    <label htmlFor="Adresse_fact"></label>
                    <input type="text" id="adresse_fact" name="adresse_fact"/>
                </div>
            </form>
        </div>
    )
}

export default clientForm3