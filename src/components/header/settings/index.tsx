import React, { useCallback } from 'react';
import './index.scss';
import { useTheme } from '../../../context/ThemeContext';
import type { Theme } from '../../../context/ThemeContext';
import useSettingsConfig from './useSettingsConfig';
import { useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface HeaderSettingsProps {
  setIsSettingsOpen: Function;
}

function HeaderSettings({ setIsSettingsOpen }: HeaderSettingsProps) {
  const { t } = useTranslation();
  const match = useMatch('/:lang/*');
  const { lang } = match?.params || {};
  const { setTheme, theme } = useTheme();

  const { languages, themes, changeLang } = useSettingsConfig();

  const handleLangClick = useCallback(
    (selectedLang: string) => {
      setIsSettingsOpen(false);
      if (lang && lang !== selectedLang) {
        changeLang(lang, selectedLang);
      }
    },
    [lang, changeLang, setIsSettingsOpen]
  );

  const handleThemeClick = useCallback((selectedTheme: Theme) => {
    setIsSettingsOpen(false);
    setTheme(selectedTheme);
  }, []);

  return (
    <div className="header-settings-menu">
      <p className="header-settings-title">{t('SETTINGS_LANGUAGE')}</p>
      <div className="header-settings-chips-container">
        {languages.map((item) => (
          <button
            key={item.id}
            className={`header-settings-chip ${lang === item.value ? 'header-settings-chip-selected' : ''}`}
            onClick={() => handleLangClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className="header-settings-title">{t('SETTINGS_THEME')}</p>
      <div className="header-settings-chips-container">
        {themes.map((item) => (
          <button
            key={item.id}
            className={`header-settings-chip-large ${theme === item.value ? 'header-settings-chip-selected' : ''}`}
            onClick={() => handleThemeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeaderSettings;
