import { NavigateFunction, Location } from 'react-router-dom';

export const changeLanguageAndRewriteHistory = ({
  newLang,
  navigate,
  location,
}: {
  newLang: string;
  navigate: NavigateFunction;
  location: Location;
}) => {
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const currentLang = pathParts[1];

  if (currentLang === newLang) return;

  const newPath = '/' + [newLang, ...pathParts.slice(2)].join('/');

  navigate(newPath + location.search, { replace: true });
};
