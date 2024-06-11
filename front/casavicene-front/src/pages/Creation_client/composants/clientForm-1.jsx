import React from 'react';
import '../style/clientForm-1.css';

function ClientForm1() {
    return (
        <div className="client-form">
            <form className="client__form">
                <div className="form-group">
                    <label htmlFor="type_client">Type de client</label>
                    <input type="text" id="type_client" name="type_client" />
                </div>
                <div className="form-group">
                    <label htmlFor="courtier">Courtier</label>
                    <input type="text" id="courtier" name="courtier" />
                </div>
                <div className="form-group">
                    <label htmlFor="assureur">Assureur</label>
                    <input type="text" id="assureur" name="assureur" />
                </div>
                <div className="form-group">
                    <label htmlFor="employeur">Employeur</label>
                    <input type="text" id="employeur" name="employeur" />
                </div>
                <div className="form-checkbox">
                    <input type="checkbox" id="client_diver" name="client_diver" />
                    <label htmlFor="client_diver">Client divers</label>
                </div>
            </form>
        </div>
    );
}

export default ClientForm1;
