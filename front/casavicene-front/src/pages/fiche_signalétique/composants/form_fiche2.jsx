function Form_fiche2() {
    return(
        <div className="form-fiche2">
            <form className="form__fiche2">
                <div className="form__fiche">
                    <label>Pers à prévenir</label>
                    <input type="text" className="pers_prevenir"/>

                    <label>Téléphone</label>
                    <input type="number" className="tel_pers"/>
                </div>

                <div className="form__fiche">
                    <label>Lien</label>
                    <input type="text" className="lien_pers"/>

                    <label>Email</label>
                    <input type="text" className="email_pers"/>
                </div>

                <div className="form__fiche">
                    <label>Médécin traitant</label>
                    <input type="text" className="med_traitant"/>

                    {/*<label>Ethnie</label>*/}
                    {/*<input type="number" className="age"/>*/}
                </div>

            </form>

        </div>
    )
}

export default Form_fiche2