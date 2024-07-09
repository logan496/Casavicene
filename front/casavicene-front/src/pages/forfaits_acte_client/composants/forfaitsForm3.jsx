import {useState, useEffect} from "react";
import "../style/forfaitsForm3.css"
function forfaitsForm3(){
    const [medecin, setMedecin] = useState('')
    const [nbrAct, setNbrAct] = useState('')
    const [quittEm, setQuittEm] = useState('')
    const [quittVal, setQuittVal] = useState('')
    const [affMed, setAffMed] = useState('')
    const [periode, setPeriode] = useState('')
    const [chambreLits, setChambreLits] = useState('')

    //cette fonction va peut-être aller dans la construction d'une requête à voir
    const affectMed = async(e) => {
        e.preventDefault()

    }
    // à savoir s'il y'a deux formulaires ou un seul à voir si j'en fais deux
    return(
        <div className="form3__contenair">
            <form className="forfaits-form3">
                <div className="forfaits__form3_med">
                    <label htmlFor="medecin">Médécin</label>
                    <input type="text" name="medecin" value={medecin}/>
                    <button className="button-send">Affecter</button>
                </div>
                <div className="forfaits__form3">
                    <label htmlFor="Nbr_Act">Nbr d'actes produits en cour</label>
                    <input type="text" id="nbrAct" name="nbrAct"/>
                    <input type="text" id="nbrAct2" name="nbrAct2"/>
                </div>
                <div className="forfaits__form3">
                    <label htmlFor="quitt_emettre">Quittance(s) à emettre</label>
                    <input type="text" id="quitt_emettre" name="quitt_emettre"/>
                    <input type="text" id="quitt_emettre2" name="quitt_emettre2"/>
                </div>
                <div className="forfaits__form3">
                    <label htmlFor="quitt_valider">Quittance(s) à emettre</label>
                    <input type="text" id="quitt_valider" name="quitt_valider"/>
                    <input type="text" id="quitt_valider2" name="quitt_valider2"/>
                </div>
                <div className="forfaits__form3">
                    <label htmlFor="Aff_med">Affecter unité med</label>
                    <input type="text" id="affmed" name="affmed"/>
                    <input type="text" id="affmed2" name="affmed2"/>
                </div>
                <h2>Hospitalisation: ------------------------------------------------------------------------</h2>
                <div className="forfaits__form3"> {/*je dois changer ça potentiellement sortir le contenu de la div*/}
                    <label htmlFor="periode">Période en cours</label>
                    <input type="text" name="periode" id="periode"/>
                </div>
                <div className="forfaits__form3">
                    <label htmlFor="chambre_lits">Chambre et lits</label>
                    <input type="text" name="ChambreLits" id="ChambreLits"/>
                </div>
            </form>
            <div className="button3__send">
                <button className="button-send">Affecter une chambre</button>
                <button className="button3">Demande prise en charge</button>
                <button className="button3__suivi">Suivi...</button>
            </div>
        </div>
    )
}

export default forfaitsForm3