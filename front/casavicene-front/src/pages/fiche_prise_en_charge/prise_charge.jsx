import Form1_charge from "./composants/form1_charge.jsx";
import Form2_charge from "./composants/form2_charge.jsx";

function Prise_charge(){
    return(
        <div className="prise-charge">
            {/*<div>*/}
            {/*    <label>N° Fiche</label>*/}
            {/*    <input type="text" className="num_fiche"/>*/}

            {/*    <label>Crée le</label>*/}
            {/*    <input type="date" className="date_creation"/>*/}

            {/*    <label>Ouvert par</label>*/}
            {/*    <label></label>/!*ici je dois récupérer le nom de l'admin et l'ajouter lors de l'ouverture de la fiche donc avoir un useEffect*!/*/}
            {/*</div>*/}
            <Form2_charge/>
        </div>
    )
}

export default Prise_charge