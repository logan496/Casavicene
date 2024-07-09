import {useState} from "react";
import "../style/forfaitsForm1.css"
function forfaitsForm1(){

    const [patient, setPatient] = useState('')
    const [sexe, setSexe] = useState('')
    const [age, setAge] = useState('')
    const [dtDerConst, setDtDerConst] = useState('')
    const [solde, setSolde] = useState('')

    const URL = "localhost:3000"

    const handleSearch = async (e) =>{
        e.preventDefault()

        const sendData = {
            patient,
            sexe,
            age,
            dtDerConst,
            solde
        }

        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: sendData
        })
            .then(response => response.json())
            .then(res => alert(res.data.message))
            .catch(error => {
                alert(error)
                console.log(error)
            })

    }


    return(
        <div className="form1__contenair">
            <form className="forfaits-form1" onSubmit={handleSearch}>
                <div className="forfaits__form1">
                    <label htmlFor="patient">Patient</label>
                    <input type="text" name="patient" value={patient} onChange={(e) => setPatient(e.target.value)}/>
                </div>
                <div className="forfaits__form1">
                    <div className="form__element">
                        <label htmlFor="Sexe">Sexe</label>
                        <input type="text" name="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)}/>
                    </div>

                    <div className="form__element2">
                        <label htmlFor="Age">Âge</label>
                        <input type="number" name="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
                    </div>

                    <div className="form__element3">
                        <label htmlFor="dtDrConst">Dt derniére const...</label>
                        <input type="date" name="DateConst" value={dtDerConst}
                               onChange={(e) => setDtDerConst(e.target.value)}/>
                    </div>

                    <div className="forfaits__element4">
                        <label htmlFor="Solde">Solde du</label>
                        <input type="Solde" name="Solde" value={solde}
                               onChange={(e) => setSolde(e.target.value)}/>
                    </div>

                </div>

            </form>
            <div className="forfaits__button">
                <button className="button-send">Choisir un patient</button>
                <button className="button-send">Nouveau patient</button>

                <button className="button-send">Mise à jour</button>
                <button className="button-send">Extrait...</button>
                <button className="button-send">Réglement décalé</button>
            </div>
        </div>
    )
}

export default forfaitsForm1