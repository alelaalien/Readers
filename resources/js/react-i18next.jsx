import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

 
const resources = {
  en: {
    translation: {
      my_profile: 'My profile',
      home: 'Home'
      
    },
  },
  es: {
    translation: {
      my_profile: 'Mi perfil',
      home: 'Home',
      poems: 'Poems',
      search: 'Buscar'
    },
  },
   
   
};

// Configura react-i18next
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Idioma por defecto
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;