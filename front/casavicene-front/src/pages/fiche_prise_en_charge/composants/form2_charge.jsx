import "../style/form2_charge.css"
function form2_charge(){

    return(
        <div className="form2Charge-contenair">
            <form className="form2charge">
                <div className="form2__charge">
                    <label htmlFor="payeur">Fiche du</label>
                    <input type="date" id="date_fiche" name="date_fiche"/>
                    <label>Réf.PEC</label>
                    <input type="text" id="ref_pec" name="ref_pec"/>
                    <label>Prise en charge</label>
                    <input type="checkbox" id="prise_charge" name="prise_charge"/>
                </div>

                <div className="form2__charge">
                    <label htmlFor="payeur">Payeur</label>
                    <input type="text" id="payeur_nom" name="payeur_nom" placeholder="nom du payeur"/>
                    <input type="text" id="payeur_prenom" name="payeur_prenom" placeholder="prénom du payeur"/>
                    <label>Garantie du payement</label>
                    <select name="garantie" className="garantie">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>

                <div className="form2__charge">
                    <label>Rel.patient-client</label>
                    <select name="rel_patient" className="rel-patient">
                        <option>1</option>
                        <option>2</option>
                    </select>

                    <label>Taux PEC</label>
                    <input type="text" id="taux_pec" name="taux_pec"/>

                    <label>Mode régl.franchise</label>
                    <select name="regl_franchise" className="regl-franchise">
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>

            </form>
            <div className="elements-prestation">
                <button className="prestation-sup">Supprimer prestation</button>

                <label className="ticket">Total ticket modérateur</label>
                <input type="text" id="total_ticket" name="total_ticket"/>

                <label>Total régler</label>
                <input type="text" id="total_regl" name="total_regl"/>

                <button className="button_valider">Valider</button>
            </div>
        </div>
    )
}

export default form2_charge