function Form_fiche1(){

    return(
        <div className="form-fiche1">
            <form className="form__fiche1">
                <div className="form__fiche">
                    <label>Numéro patient</label>
                    <input type="text" id="num_patient" name="num_patient"/>
                    <label>Type de fiche</label>
                    <input type="checkbox" id="standart" name="standard"/>
                    <input type="checkbox" id="urgence" name="urgence"/>
                </div>

                <div className="form__fiche">
                    <label>Noms et prénom</label>
                    <input id="nom" name="nom" type="text"/>
                    <input id="prenom" name="prenom" type="text"/>
                </div>

                <div className="form__fiche">
                    <label>Sexe</label>

                    <label>Masculin</label>
                    <input type="checkbox" name="masculin"/>

                    <label>Feminin</label>
                    <input type="checkbox" name="feminin"/>

                    <label>Adresse</label>
                    <input type="checkbox" name="adress"/>
                </div>

                <div className="form__fiche">
                    <label>Date de naissance</label>
                    <input type="date" className="date_naiss"/>

                    <label>Âge</label>
                    <input type="number" className="age"/>
                </div>

                <div className="form__fiche">
                    <label>Profession</label>
                    <input type="text" className="profession"/>

                    <label>Téléphone patient</label>
                    <input type="number" className="tel_patient"/>
                </div>
            </form>
        </div>
    )
}

export default Form_fiche1