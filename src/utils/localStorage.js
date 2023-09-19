export const getTheme = () => {
    const theme = localStorage.getItem('theme');
    if (theme) {
        return theme;
    }
    return 'light';
};
export const setThemeToLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
}