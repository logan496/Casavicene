import "../style/PatientEnCours.css"
function PatientEnCours(){

    return(
        <div className="patient__cour-contenair">
            <table className="patient-tab">
                <thead>
                    <th>Date</th>
                    <th>N° Fiche</th>
                    <th>Client</th>
                    <th>Patient</th>
                    <th>Ouvert par</th>
                    <th>Dt prec.cons</th>
                    <th>Statut</th>
                    <th>Prescription</th>
                    <th></th>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
            <div className="preinscription-contener">
                <label>Préinscription en cours</label>
                <input type="text" className="consultation-gen" id="consultation-gen" value="consultation généraliste"/>
            </div>
        </div>
    )
}

export default PatientEnCours