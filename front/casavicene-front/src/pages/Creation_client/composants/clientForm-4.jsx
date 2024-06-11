import React from 'react';
import '../style/clientForm-4.css'

function ClientForm4() {
    return (
        <div className="client-form">
            <form className="client__form">
                {/* Ajoutez les champs du formulaire ici */}
                <div className="form-group">
                    <label htmlFor="memo">Mémo</label>
                    <input type="text" id="memo" name="memo" />
                </div>
                <div className="form-group">
                    <label htmlFor="motif">Motif</label>
                    <input type="text" id="motif" name="motif" />
                </div>
                {/* Ajoutez les autres champs nécessaires */}
            </form>
        </div>
    );
}

export default ClientForm4;
