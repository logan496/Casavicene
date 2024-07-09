function form_fiche(){
    return(
        <div className="formSign-contener">
            <form className="form-fiche__sign">
                <div className="form__fiche1">
                    <label>Numéro patient</label>
                    <input type="text" id="num_patient" name="num_patient"/>
                    <label>Type de fiche</label>
                    <input type="checkbox" id="standart" name="standard"/>
                    <input type="checkbox" id="urgence" name="urgence"/>
                </div>
                <div className="form__fiche2">
                    <label>Noms et prénom</label>
                    <input id="nom" name="nom" type="text"/>
                    <input id="prenom" name="prenom" type="text"/>
                </div>
                <div className="form__fiche3">

                </div>
            </form>
        </div>
    )
}

export default form_fiche