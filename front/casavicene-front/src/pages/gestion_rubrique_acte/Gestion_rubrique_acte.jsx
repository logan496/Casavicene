import Nav_general from "../../composants/nav_general.jsx";
import Form1 from "./composants/form1.jsx";
function Gestion_rubrique_acte(){
    return (
        <>
            <div className="nav-bar">
                <Nav_general scaleValue={"Gestion rubrique des actes"}/>
            </div>
            <div className="rubriques_actes">
                <Form1/>
            </div>
        </>

    )
}

export default Gestion_rubrique_acte