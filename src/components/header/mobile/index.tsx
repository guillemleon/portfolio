import React, { useEffect, useRef, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import useHeaderConfig from '../useHeaderConfig';
import type { LinkInterface } from '../useHeaderConfig';
import HeaderSettings from '../settings';

interface HeaderMobileProps {}

const HeaderMobile = ({}: HeaderMobileProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const { links } = useHeaderConfig();

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
    <div className="header-mobile-container">
      <ul className="header-mobile-list">
        {links?.map((link: LinkInterface) => (
          <li key={link.id} className="header-mobile-list-item">
            {link.type === 'settings' ? (
              // <div ref={settingsRef} className="header-mobile-settings-container">
              <>
                <button
                  onClick={() => setIsSettingsOpen((prevState) => !prevState)}
                  className="header-mobile-list-link"
                >
                  {link.name}
                </button>
              </>
            ) : (
              <Link className="header-mobile-list-link" key={link.id} to={!!link.to ? link.to : ''}>
                {link.name}
              </Link>
            )}
          </li>
        ))}
        {isSettingsOpen && <HeaderSettings setIsSettingsOpen={setIsSettingsOpen} />}
      </ul>
    </div>
  );
};

export default HeaderMobile;
