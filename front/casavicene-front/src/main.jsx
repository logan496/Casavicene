import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreateClient from "./pages/Creation_client/Create-client.jsx";
import Login from "./pages/login/login.jsx"
import ForfaitsActeParClient from "./pages/forfaits_acte_client/forfaitsActeParClient.jsx";
import Gestion_params from "./pages/Gestion_params/Gestion_params.jsx";
import Prise_charge from "./pages/fiche_prise_en_charge/prise_charge.jsx";
import Fiche_signaletique from "./pages/fiche_signalétique/fiche_signaletique.jsx";
import Navbar1 from "./pages/Accueil/composants/Navbar1.jsx";
import Navbar2 from "./pages/Accueil/composants/Navbar2.jsx";
import Gestion_rubrique_acte from "./pages/gestion_rubrique_acte/Gestion_rubrique_acte.jsx";
import './index.css'
import  {BrowserRouter as Router, Routes, Route} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<Fiche_signaletique/>} />
            </Routes>
        </Router>
    </React.StrictMode>,
)