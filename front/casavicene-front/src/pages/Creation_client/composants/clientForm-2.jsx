import "../style/clientForm-2.css"
function ClientForm2(){
    return(
        <div className="client-form">
            <form className="client__form">
                <div className="form-group2">
                    <label htmlFor="Boite_postale">Boîte postale</label>
                    <input type="text" id="boite_postale" name="boite_postale"/>
                </div>
                <div className="form-group2">
                    <label htmlFor="Ville">Boîte postale</label>
                    <input type="text" id="ville" name="ville"/>
                </div>
                <div className="form-group2">
                    <label htmlFor="pays">pays</label>
                    <input type="text" id="pays" name="pays"/>
                </div>
                <div className="form-group2">
                    <label htmlFor="Telephone"></label>
                    <input type="number" id="tel" name="tel"/>
                </div>
                <div className="form-group2">
                    <label htmlFor="Fax"></label>
                    <input type="number" id="fax" name="fax"/>
                </div>
                <div className="form-group2">
                    <label htmlFor="Email"></label>
                    <input type="email" id="email" name="email"/>
                </div>
                <div className="form-group2">
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

export default ClientForm2