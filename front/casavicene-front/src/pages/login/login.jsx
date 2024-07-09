import {useState} from "react";
import BlueArc from "./composants/blueArc.jsx";
import DivLog from "./composants/divLog.jsx";
import "./login.css"
function login(){
    const[isLogin, setIsLogin] = useState(true)

    const toggleForm = () =>{
        setIsLogin(!isLogin)
    }

    return(
        <>
            <div className="blue-arc">
                <BlueArc isLogin={isLogin}/>
            </div>
            <div className="login-container">
                <DivLog isLogin={isLogin}/>
            </div>
            <button onClick={toggleForm}>
                {isLogin ? 'login' : 'register'}
                {/*pour un début je vais mettre un bouton à changer plus tard*/}
            </button>
            <h1>.</h1>
        </>

    )
}

export default login