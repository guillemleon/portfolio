import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import useHeaderConfig from '../useHeaderConfig';
import type { LinkInterface } from '../useHeaderConfig';
import HeaderSettings from '../settings';
import useCurrentRoute from '../../../hooks/useCurrentRoute';
import useCurrentLang from '../../../hooks/useCurrentLang';

interface HeaderMobileProps {}

const HeaderMobile = ({}: HeaderMobileProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const currentRoute = useCurrentRoute() || '';
  const currentLang = useCurrentLang();
  const { links } = useHeaderConfig();

  useEffect(() => {
    return () => setIsOpen(false);
  }, []);

  const getLinkClassBasedOnCurrentRoute = useCallback(
    (link: LinkInterface) => {
      if (
        (currentRoute.length > 0 && link.to?.includes(currentRoute)) ||
        (!currentRoute.length && link.to === `/${currentLang}`)
      ) {
        return 'header-mobile-list-link-selected';
      }

      return 'header-mobile-list-link';
    },
    [currentRoute]
  );

  const burgerMenuClassBasedOnCurrentRoute = useMemo(() => {
    if (currentRoute?.includes('about')) return 'header-mobile-menu-icon-container-about';

    return 'header-mobile-menu-icon-container';
  }, [currentRoute]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSettingsOpen &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  return (
    <>
      <button className={burgerMenuClassBasedOnCurrentRoute} onClick={() => setIsOpen(!isOpen)}>
        <span className={`header-mobile-menu-icon ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div className="header-mobile-container">
          <ul className="header-mobile-list">
            {links?.map((link: LinkInterface) => (
              <li key={link.id} className="header-mobile-list-item">
                {link.type === 'settings' ? (
                  <div ref={settingsRef} className="header-mobile-settings-container">
                    <button
                      onClick={() => setIsSettingsOpen((prevState) => !prevState)}
                      className="header-mobile-list-link"
                    >
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
      )}
    </>
  );
};

export default HeaderMobile;
