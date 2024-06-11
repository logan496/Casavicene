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
                <Nav_general />
            </div>
            <div className="form-container">
                <ClientForm1 />
                {/*<ClientForm2 />*/}
                {/*<ClientForm3 />*/}
                {/*<ClientForm4 />*/}
            </div>
        </>
    );
}

export default CreateClient;
