import "./Gestion_params.css"
import Params from "./composants/params.jsx"
import Nav_general from "../../composants/nav_general.jsx";
import Tab_params from "./composants/Tab_params.jsx";
import Memo from "./composants/Memo.jsx";
function gestion_params() {
    const scaleValue = "Gestion des paramètres"
    return(
        <>
            <div className="nav-bar">
                <Nav_general scaleValue={scaleValue}/>
            </div>
            <div className="gestion-container">
                <Params/>
                <Tab_params/>
                <Memo/>
            </div>
        </>

    )
}

export default gestion_params