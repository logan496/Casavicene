import React from 'react';
import '../style/clientForm-4.css';

function ClientForm4() {
    return (
        <div className="client-form4">
            <form className="client__form4">
                <div className="form-group">
                    <input type="checkbox" id="suspendu" name="suspendu"/>
                    <label htmlFor="suspendu">Suspendu</label>
                </div>
                <div className="form-group">
                    <label htmlFor="a_compter_du">A compter du</label>
                    <input type="text" id="a_compter_du" name="a_compter_du"/>
                </div>
                <div className="form-group">
                    <label htmlFor="memo">Mémo</label>
                    <input type="text" id="memo" name="memo"/>
                </div>
                <div className="form-group large">
                    <label htmlFor="motif">Motif</label>
                    <input type="text" id="motif" name="motif"/>
                </div>
            </form>
        </div>
    );
}

export default ClientForm4;
