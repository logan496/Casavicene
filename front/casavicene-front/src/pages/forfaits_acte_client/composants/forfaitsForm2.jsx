import {useState, useEffect} from "react";
import "../style/forfaitsForm2.css"
function forfaitsForm2(){
    const [numFiche, setNumFiche] = useState(0)
    const URL = ""
    const sendNumber = async (e) => {
        e.preventDefault()

        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: numFiche
        })
            .then(response => response.json())
            .then(res => alert(res.data.message))
            .catch(error => {
                alert(error)
                console.log(error)
            })

    }

    return(
        <div className="form2__contenair">
            <form className="forfaits-form2">
                <div className="Num_fiche_component">
                    <label htmlFor="num_fiche">N° Fiche</label>
                    <input type="number" id="num_fiche" name="num_fiche" value={numFiche}
                           onChange={(e) => setNumFiche(e.target.value)}/>
                </div>
                <label htmlFor="dateOuverture">Ouverture</label>
                <label htmlFor="typePEC">Type PEC</label>
                <label htmlFor="Statut">Statut</label>
                {/*faut que je check vraiment quoi faire pour le reste*/}
            </form>

            <div className="forfaits__button">
                <button className="button-send">Fermer</button>
                <button className="button-send">Selectionner une fiche</button>
                <button className="button-send">Nouvelle</button>
                <button className="button-send">Consulter...</button>
                <button className="button-send">Avances...</button>
            </div>
        </div>
    )
}

export default forfaitsForm2