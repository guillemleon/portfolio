const TERMINAL_COMMANDS = (t: Function) => {
  return {
    help: `
    <div>
        <p>> help</p>
        <p>${t('TERMINAL_AVAILABLE_COMMANDS')}</p>
        <div style={{ marginTop: '10px' }}>
            <ul>
                <li>- help</li>
                <li>- cat about</li>
                <li>- ls skills</li>
                <li>- clear</li>
                <li>- exit</li>
            </ul>
        </div>
    </div>
    `,
    about: `
    <div>
        <p>> cat about</p>
        <p>${t('ABOUT_PARAGRAPH_1')}</p>
        <p>${t('ABOUT_PARAGRAPH_2')}</p>
        <p>${t('ABOUT_PARAGRAPH_3')}</p>
        <p>${t('ABOUT_PARAGRAPH_4')}</p>
    </div>
    `,
    skills: `
    <div>
        <p>> ls skills</p>
        <p>Frontend: </p>
        <ul>
            <li>- JavaScript</li>
            <li>- TypeScript</li>
            <li>- HTML</li>
            <li>- CSS/SCSS/LESS</li>
            <li>- React</li>
            <li>- React Native</li>
            <li>- Redux</li>
            <li>- Webpack</li>
            <li>- Babel</li>
            <li>- Gatsby</li>
            <li>- Jest</li>
        </ul>
        <br />
        <p>Backend: </p>
        <ul>
            <li>- Python</li>
            <li>- Django</li>
            <li>- NodeJS</li>
            <li>- SQL/PosgreSQL</li>
            <li>- MongoDB</li>
        </ul>
        <br />
        <p>${t('ABOUT_SKILLS_OTHERS')}</p>
        <ul>
            <li>- Git</li>
            <li>- CD/CI</li>
            <li>- Figma</li>
            <li>- CMS</li>
            <li>- Azure DevOps</li>
        </ul>
    </div>
    `,
  };
};

export { TERMINAL_COMMANDS };
