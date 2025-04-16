import React, { useCallback } from 'react';
import './index.scss';
import { useTheme } from '../../../context/ThemeContext';
import useSettingsConfig from './useSettingsConfig';

interface HeaderSettingsProps {
  setIsSettingsOpen: Function;
}

function HeaderSettings({ setIsSettingsOpen }: HeaderSettingsProps) {
  const { setTheme, theme } = useTheme();
  const { languages, themes } = useSettingsConfig();

  const handleLangClick = useCallback(() => {
    setIsSettingsOpen(false);
  }, []);

  const handleThemeClick = useCallback((selectedTheme: any) => {
    setIsSettingsOpen(false);
    setTheme(selectedTheme);
  }, []);

  return (
    <div className="header-settings-menu">
      <p className="header-settings-title">Language</p>
      <div className="header-settings-chips-container">
        {languages.map((item) => (
          <button key={item.id} className={`header-settings-chip`} onClick={handleLangClick}>
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
