import {useState, useEffect} from "react";
import "../style/BarreForfaitsForm3.css"
import cross from "../../../assets/xmark-solid.svg"
function barreForfaitsForm3() {

    return(
        <div className="barre-contenair">

            <div className="cross">
                <img
                    className="cross-close"
                    src={cross}
                    alt="cross-image"
                />
            </div>

            <label>Nbr patients</label>
            <div>
                <p>123445</p>
            </div>

            <label>Nbr patients à l'accueil</label>
            <div>
                <p>123445</p>
            </div>

            <label>Nbr quitt à éditer</label>
            <div>
                <p>123445</p>
            </div>

            <label>Nbr quitt à valider</label>
            <div>
                <p>123445</p>
            </div>

            <label>Tps moyen passage</label>
            <div>
                <p>123445</p>
            </div>

            <button className="journal-caisse">Journal caisse</button>

        </div>
    )
}

export default barreForfaitsForm3