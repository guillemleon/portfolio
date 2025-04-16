import { useMemo } from 'react';

const useSettingsConfig = () => {
  const languages = useMemo(() => {
    return [
      { id: '1-lang', name: 'EN' },
      { id: '2-lang', name: 'ES' },
      { id: '3-lang', name: 'CAT' },
    ];
  }, []);

  const themes = useMemo(() => {
    return [
      { id: '1-theme', name: 'DARK', value: 'dark' },
      { id: '2-theme', name: 'LIGHT', value: 'light' },
    ];
  }, []);

  return { languages, themes };
};

export default useSettingsConfig;
