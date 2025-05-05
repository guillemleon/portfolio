import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TERMINAL_COMMANDS } from './config';
import DOMPurify from 'dompurify';
import './index.scss';
import useCurrentLang from '../../../hooks/useCurrentLang';
import { useTheme } from '../../../context/ThemeContext';
import termIcon from '../../../assets/img/term-icon.png';

interface TerminalProps {
  title: string;
}

function Terminal({ title }: TerminalProps) {
  const { t } = useTranslation();
  const lang = useCurrentLang();
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContent = useRef<HTMLDivElement>(null);
  const terminalContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContent.current && inputRef.current) {
      cleanTerminal();
      inputRef.current?.focus();
    }
  }, [lang, theme, terminalContent.current, inputRef.current]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, [inputRef.current]);

  useEffect(() => {
    if ((isTerminalOpen && inputRef.current) || (!isTerminalMinimized && inputRef.current)) {
      inputRef.current.focus();
    }
  }, [inputRef.current, isTerminalOpen, isTerminalMinimized]);

  const handleScrollToBottom = useCallback(() => {
    const el = terminalContainer.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [terminalContainer.current]);

  const cleanTerminal = useCallback(() => {
    if (terminalContent.current && inputRef.current) {
      terminalContent.current.innerHTML = '';
      inputRef.current.value = '';
      setInputValue('');
    }
  }, [terminalContent.current, inputRef.current]);

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
      case 'exit':
        handleCloseTerminal();
        break;
      case '':
        return;
      default:
        message.textContent = `> command not found: ${inputValue}`;
        break;
    }

    terminalContent.current.appendChild(message);
    setInputValue('');
    handleScrollToBottom();
  }, [inputValue, t]);

  useEffect(() => {
    if (inputValue.length > 0) handleScrollToBottom();
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

  const handleCloseTerminal = useCallback(() => {
    cleanTerminal();
    setIsTerminalOpen(false);
    setIsTerminalMinimized(false);
  }, []);

  const getTerminalStatusClass = useMemo(() => {
    if (isTerminalMinimized) return 'terminal-minimized';

    return 'terminal-maximized';
  }, [isTerminalMinimized]);

  return (
    <div className="terminal-container">
      {isTerminalOpen ? (
        <>
          <div className="terminal-header">
            <div className="terminal-header-image-container">
              <img src={termIcon}></img>
              <p>Terminal</p>
            </div>
            <div className="terminal-header-buttons">
              <button
                onClick={() => setIsTerminalMinimized(false)}
                className="terminal-button-maximize"
              ></button>
              <button
                onClick={() => setIsTerminalMinimized(true)}
                className="terminal-button-minimize"
              ></button>
              <button onClick={handleCloseTerminal} className="terminal-button-close"></button>
            </div>
          </div>
          <div
            ref={terminalContainer}
            className={`terminal-content ${getTerminalStatusClass}`}
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
        </>
      ) : (
        <button onClick={() => setIsTerminalOpen(true)} className="terminal-icon">
          <img src={termIcon}></img>
          <p>Terminal</p>
        </button>
      )}
    </div>
  );
}

export default Terminal;
