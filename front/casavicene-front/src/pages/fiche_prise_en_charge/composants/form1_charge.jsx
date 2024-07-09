function form1_charge(){

    return(
        <div className="form1Charge-contenair">
            <form className="formCharge1">
                <label>N° fiche</label>
                <input type="number"id="num_fiche" name="num_fiche" placeholder="numéro fiche"/>
                <label>Créer le</label>
                <input type="date" id="date_creation" name="date_creation" placeholder="dd/mm/yy"/>
                <label>Ouvert par</label>
                <input type="text"/>
            </form>
        </div>
    )
}

export default form1_charge