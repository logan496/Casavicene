import "../style/form_fiche.css"
function form_fiche(){
    return(
        <div className="formSign-contener">
            <form className="form-fiche__sign">
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
                    <lable>St.matrimonial</lable>

                    <select className="st_mat">
                        <option>Marié</option>
                        <option>Divorcé</option>
                        <option>Célibataire</option>
                    </select>
                </div>

                <div className="form__fiche">
                    <label>Date de naissance</label>
                    <input type="date" className="date_naiss"/>

                    <label>Âge</label>
                    <input type="number" className="age"/>
                </div>

                <div className="form__fiche">
                    <label>Lieu</label>
                    <input type="text" className="lieu"/>

                    <label>Ville de résidence</label>
                    <input type="text" className="ville"/>
                </div>

                <div className="form__fiche">
                    <label>Profession</label>
                    <input type="text" className="profession"/>

                    <label>Téléphone patient</label>
                    <input type="number" className="tel_patient"/>
                </div>

                <div className="form__fiche">
                    <label>Pers à prévenir</label>
                    <input type="text" className="pers_prevenir"/>

                    <label>Téléphone</label>
                    <input type="number" className="tel_pers"/>
                </div>

                <div className="form__fiche">
                    <label>Lien</label>
                    <input type="text" className="lien_pers"/>

                    <label>Email</label>
                    <input type="text" className="email_pers"/>
                </div>

                <div className="form__fiche">
                    <label>Médécin traitant</label>
                    <input type="text" className="med_traitant"/>

                    {/*<label>Ethnie</label>*/}
                    {/*<input type="number" className="age"/>*/}
                </div>

                <div className="form__fiche">
                    <label>Payeur</label>
                    <input type="text" className="payeur_nom"/>

                    {/*<label>Âge</label>*/}
                    {/*<input type="number" className="age"/>*/}
                </div>

                <div className="form__fiche">
                    <label>Rél patient payeur</label>
                    <input type="date" className="rel_patient_payeur"/>

                    {/*<label>Âge</label>*/}
                    {/*<input type="number" className="age"/>*/}
                </div>

                <div className="form__fiche">
                    <label>N° assuré</label>
                    <input type="text" className="num_assure"/>
                </div>

                <div className="form__fiche">
                    <label>Matricule employé</label>
                    <input type="text" className="mat_emplpoyer"/>
                </div>

                <div className="form__fiche">
                    <label>Observations particuliéres</label>
                    <input type="text" className="observations"/>
                </div>

                <div className="form__fiche">
                    <label>Créer le</label>
                    <input type="date" className="date_creation_ficheSign"/>

                    <label>Par</label>
                    <input type="text" className="name_creator_ficheSign"/>

                    <label>Mis à jour le</label>
                    <input type="date" className="date_modif_ficheSign"/>
                    {/* nom de la personne qui as modifier la fiche signalétique*/}
                    <label>Par</label>
                    <input type="text" className="name_modif_ficheSign"/>
                </div>
            </form>
        </div>
    )
}

export default form_fiche