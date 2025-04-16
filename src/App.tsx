import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useNavigate,
  useLocation,
  useMatch,
} from 'react-router-dom';
import { useEffect } from 'react';
import './normalize.css';
import './fonts.css';
import { ThemeProvider } from './context/ThemeContext';
import useDeviceDetection from './hooks/useDeviceDetection';
import { useTranslation } from 'react-i18next';
import AppRoutes from './routes';

const AppLangWrapper = () => {
  const match = useMatch('/:lang/*');
  const { lang } = match?.params || {};
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!lang || !['en', 'es', 'cat'].includes(lang)) {
      if (i18n.language !== 'en') {
        navigate(`/en${location.pathname}${location.search}`, { replace: true });
      }
    } else {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n, navigate, location]);

  return <AppRoutes />;
};

const App = () => {
  const isMobile = useDeviceDetection();

  if (isMobile === null) return null;

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<AppLangWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
