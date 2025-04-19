import { useMatch } from 'react-router-dom';

const useCurrentRoute = () => {
  const match = useMatch('/:lang/*');
  return match?.params['*'];
};

export default useCurrentRoute;
