import './Create_client.css';
import Nav_general from "../../composants/nav_general.jsx";

function CreateClient() {
    return (
        <>
            <div className="nav-bar">
                <Nav_general/>
            </div>

            <div className="client-form">
                <form className="client__form">
                    <div className="client__form_row">
                        <div className="form-group">
                            <label htmlFor="type_client">Type de client</label>
                            <input type="text" id="type_client" name="type_client" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="courtier">Courtier</label>
                            <input type="text" id="courtier" name="courtier" />
                        </div>
                        <div className="form-group form-checkbox">
                            <label htmlFor="client-diver">client diver</label>
                            <input type="checkbox" id="client-diver" name="client_diver" />
                        </div>
                    </div>
                    <div className="client__form_row">
                        <div className="form-group">
                            <label htmlFor="assureur">Assureur</label>
                            <input type="text" id="assureur" name="assureur" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employeur">Employeur</label>
                            <input type="text" id="employeur" name="employeur" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateClient;
