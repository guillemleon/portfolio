import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TERMINAL_COMMANDS } from './config';
import DOMPurify from 'dompurify';
import './index.scss';
import useCurrentLang from '../../../hooks/useCurrentLang';
import { useTheme } from '../../../context/ThemeContext';

interface TerminalProps {
  title: string;
}

function Terminal({ title }: TerminalProps) {
  const { t } = useTranslation();
  const lang = useCurrentLang();
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContent = useRef<HTMLDivElement>(null);
  const terminalContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContent.current && inputRef.current) {
      terminalContent.current.innerHTML = '';
      inputRef.current?.focus();
    }
  }, [lang, theme, terminalContent.current, inputRef.current]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);

  const handleEnterPress = useCallback(() => {
    if (!terminalContent.current) return;

    const message = document.createElement('div');
    message.className = 'terminal-text';

    switch (inputValue) {
      case 'help':
        const cleanHelpHTML = DOMPurify.sanitize(TERMINAL_COMMANDS(t).help);
        message.innerHTML = cleanHelpHTML;
        break;
      case 'ls skills':
        const cleanSkillsHTML = DOMPurify.sanitize(TERMINAL_COMMANDS(t).skills);
        message.innerHTML = cleanSkillsHTML;
        break;
      case 'cat about':
        const cleanAboutHTML = DOMPurify.sanitize(TERMINAL_COMMANDS(t).about);
        message.innerHTML = cleanAboutHTML;
        break;
      case 'clear':
        terminalContent.current.innerHTML = '';
        break;
      case '':
        return;
      default:
        message.textContent = `> command not found: ${inputValue}`;
        break;
    }

    terminalContent.current.appendChild(message);
    setInputValue('');
  }, [inputValue, t]);

  useEffect(() => {
    const el = terminalContainer.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [inputValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setInputValue((prev) => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        handleEnterPress();
      } else if (e.key.length === 1) {
        setInputValue((prev) => prev + e.key);
      }
    },
    [inputValue, setInputValue, handleEnterPress]
  );

  return (
    <div
      ref={terminalContainer}
      className="terminal-container"
      onClick={() => inputRef.current?.focus()}
    >
      <h1 className="terminal-title">{title}</h1>
      <p className="terminal-text">{t('TERMINAL_HELP')}</p>
      <p className="terminal-text">{'> --'}</p>
      <div ref={terminalContent} />
      <div className="terminal-text">
        <span>{t('COMMAND_LINE')}</span>
        <div className="terminal-fake-input">
          <span className="typed">{inputValue}</span>
          <span className="terminal-cursor" />
          <input ref={inputRef} className="real-hidden-input" onKeyDown={handleKeyDown} />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
