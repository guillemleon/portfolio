import React, { useCallback } from 'react';
import './index.scss';
import { useTheme } from '../../../context/ThemeContext';
import useSettingsConfig from './useSettingsConfig';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

interface HeaderSettingsProps {
  setIsSettingsOpen: Function;
}

function HeaderSettings({ setIsSettingsOpen }: HeaderSettingsProps) {
  const match = useMatch('/:lang/*');
  const { lang } = match?.params || {};
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleThemeClick = useCallback((selectedTheme: any) => {
    setIsSettingsOpen(false);
    setTheme(selectedTheme);
  }, []);

  return (
    <div className="header-settings-menu">
      <p className="header-settings-title">Language</p>
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
      <p className="header-settings-title">Theme</p>
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
