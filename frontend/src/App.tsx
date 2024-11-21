// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import './locales/i18n'
import Dashboard from "./pages/Dashboard";
import DocumentUpload from "./pages/DocumentUpload";
import MemberForm from "./pages/MemberForm";
import MembriPage from "./pages/MembriPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload-document" element={<DocumentUpload />} />
                <Route path="/member-form" element={<MemberForm />} />
                <Route path="/membri" element={<MembriPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
