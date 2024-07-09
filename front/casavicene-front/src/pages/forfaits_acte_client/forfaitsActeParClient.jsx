import ForfaitsForm1 from "./composants/forfaitsForm1.jsx";
import ForfaitsForm2 from "./composants/forfaitsForm2.jsx";
import ForfaitsForm3 from "./composants/forfaitsForm3.jsx";
// import BarreForfaitsForm3 from "./composants/BarreForfaitsForm3.jsx";
import PatientEnCours from "./composants/PatientEnCours.jsx";
import "./forfaitsActeParClient.css"
import troisBarre from "../../assets/bars-solid.svg"
import Nav_general from "../../composants/nav_general.jsx";


function forfaitsActeParClient(){
    return(
        <>
            <div className="nav-bar">
                <Nav_general scaleValue={""}/>
            </div>
            <div className="button-aff">
                <img
                    className="img-barres"
                    src={troisBarre}
                    alt="barres"/>
            </div>
            <div className="forfait-contenair">
                <ForfaitsForm1/>
                <ForfaitsForm2/>
                <ForfaitsForm3/>
                <PatientEnCours/>
            </div>
        </>

    );
}

export default forfaitsActeParClient
