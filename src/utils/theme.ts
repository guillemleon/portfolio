const handleChangeTheme = (colorName: string) => {
    document.documentElement.setAttribute('data-theme', colorName);
};

export { handleChangeTheme }