import { useMatch } from 'react-router-dom';

const useCurrentLang = () => {
  const match = useMatch('/:lang/*');
  const { lang } = match?.params || {};
  return lang ?? 'en';
};

export default useCurrentLang;
