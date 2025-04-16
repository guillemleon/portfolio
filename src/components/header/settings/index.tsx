import React, { useCallback } from 'react';
import './index.scss';
import { useTheme } from '../../../context/ThemeContext';

interface HeaderSettingsProps {
  setIsSettingsOpen: Function;
}

function HeaderSettings({ setIsSettingsOpen }: HeaderSettingsProps) {
  const { setTheme } = useTheme();

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
        <button className="header-settings-chip" onClick={handleLangClick}>
          EN
        </button>
        <button className="header-settings-chip" onClick={handleLangClick}>
          ES
        </button>
        <button className="header-settings-chip" onClick={handleLangClick}>
          CAT
        </button>
      </div>
      <p className="header-settings-title">Theme</p>
      <div className="header-settings-chips-container">
        <button className="header-settings-chip-large" onClick={() => handleThemeClick('dark')}>
          DARK
        </button>
        <button className="header-settings-chip-large" onClick={() => handleThemeClick('light')}>
          LIGHT
        </button>
      </div>
    </div>
  );
}

export default HeaderSettings;
