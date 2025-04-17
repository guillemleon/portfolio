import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Theme } from '../../../context/ThemeContext';

interface ThemeInterface {
  id: string;
  name: string;
  value: Theme;
}

interface LangInterface {
  id: string;
  name: string;
  value: string;
}

const useSettingsConfig = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const languages = useMemo((): LangInterface[] => {
    return [
      { id: '1-lang', name: 'EN', value: 'en' },
      { id: '2-lang', name: 'ES', value: 'es' },
      { id: '3-lang', name: 'CAT', value: 'cat' },
    ];
  }, []);

  const themes = useMemo((): ThemeInterface[] => {
    return [
      { id: '1-theme', name: t('SETTINGS_DARK'), value: 'dark' },
      { id: '2-theme', name: t('SETTINGS_LIGHT'), value: 'light' },
    ];
  }, [t]);

  const changeLang = (currentLang: string, newLang: string) => {
    const newPath = window.location.pathname.replace(`/${currentLang}`, `/${newLang}`);
    navigate(newPath);
  };

  return { languages, themes, changeLang };
};

export default useSettingsConfig;
