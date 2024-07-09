import './Create_client.css';
import Nav_general from "../../composants/nav_general.jsx";
import ClientForm1 from "./composants/clientForm-1.jsx";
import ClientForm2 from "./composants/clientForm-2.jsx";
import ClientForm3 from "./composants/clientForm-3.jsx";
import ClientForm4 from "./composants/clientForm-4.jsx";

function CreateClient() {
    return (
        <>
            <div className="nav-bar">
                <Nav_general scaleValue={"Creation du client"}/>
            </div>
            <div className="form-container">
                <ClientForm1 />
                <div className="form-container__line">
                    <ClientForm2 />
                    <ClientForm3 />
                </div>
                <ClientForm4 />
            </div>
        </>
    );
}

export default CreateClient;
