import React, { useCallback, useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import useHeaderConfig from './useHeaderConfig';
import type { LinkInterface } from './useHeaderConfig';
import HeaderSettings from './settings';
import useCurrentRoute from '../../hooks/useCurrentRoute';
import useCurrentLang from '../../hooks/useCurrentLang';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const currentRoute = useCurrentRoute() || '';
  const currentLang = useCurrentLang();
  const { links } = useHeaderConfig();

  const getLinkClassBasedOnCurrentRoute = useCallback(
    (link: LinkInterface) => {
      if (
        (currentRoute.length > 0 && link.to?.includes(currentRoute)) ||
        (!currentRoute.length && link.to === `/${currentLang}`)
      ) {
        return 'header-list-link-selected';
      }

      return 'header-list-link';
    },
    [currentRoute]
  );

  return (
    <div className="header-container">
      <ul className="header-list">
        {links?.map((link: LinkInterface) => (
          <li key={link.id} className="header-list-item">
            {link.type === 'settings' ? (
              <div
                className="header-settings-container"
                onMouseLeave={() => setIsSettingsOpen(false)}
              >
                <button onMouseEnter={() => setIsSettingsOpen(true)} className="header-list-link">
                  {link.name}
                </button>
                {isSettingsOpen && <HeaderSettings setIsSettingsOpen={setIsSettingsOpen} />}
              </div>
            ) : (
              <Link
                className={getLinkClassBasedOnCurrentRoute(link)}
                key={link.id}
                to={!!link.to ? link.to : ''}
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
