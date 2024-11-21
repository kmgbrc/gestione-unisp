// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const HomePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>{t("welcome")}</h1>
            <nav>
                <ul style={{ listStyle: "none" }}>
                    <li><Link to="/dashboard">Vai alla Dashboard</Link></li>
                    <li><Link to="/upload-document">Carica Documenti</Link></li>
                    <li><Link to="/member-form">Compila il Form dei Membri</Link></li>
                    <li><Link to="/membri">Gestione Membri</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
