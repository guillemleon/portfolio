import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const useSettingsConfig = () => {
  const navigate = useNavigate();

  const languages = useMemo(() => {
    return [
      { id: '1-lang', name: 'EN', value: 'en' },
      { id: '2-lang', name: 'ES', value: 'es' },
      { id: '3-lang', name: 'CAT', value: 'cat' },
    ];
  }, []);

  const themes = useMemo(() => {
    return [
      { id: '1-theme', name: 'DARK', value: 'dark' },
      { id: '2-theme', name: 'LIGHT', value: 'light' },
    ];
  }, []);

  const changeLang = (currentLang: string, newLang: string) => {
    const newPath = window.location.pathname.replace(`/${currentLang}`, `/${newLang}`);
    navigate(newPath);
  };

  return { languages, themes, changeLang };
};

export default useSettingsConfig;
