import "../style/blueArc.css"
function blueArc({isLogin}){
    return(
        <div className="blue__arc">
            <div className="arc__title">
                <h1>{isLogin ? 'Login' : 'Register'}</h1>
            </div>
        </div>
    )
}

export default blueArc