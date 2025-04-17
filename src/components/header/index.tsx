import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import useHeaderConfig from './useHeaderConfig';
import type { LinkInterface } from './useHeaderConfig';
import HeaderSettings from './settings';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { links } = useHeaderConfig();

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
              <Link className="header-list-link" key={link.id} to={!!link.to ? link.to : ''}>
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
