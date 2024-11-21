import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            welcome: "Welcome to our platform",
        },
    },
    it: {
        translation: {
            welcome: "Benvenuto nella nostra piattaforma",
        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue sur notre plateforme",
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "it",
        interpolation: {
            escapeValue: false,
        }
    })
    .catch((err) => console.error(err)); // Gérer les erreurs

export default i18n;
