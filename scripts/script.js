// Переключение светлой и тёмной темы
(function() {
    const lightTheme = document.getElementById('theme-light');
    const darkTheme = document.getElementById('theme-dark');
    const buttons = document.querySelectorAll('.theme-menu__button');
    
    const STORAGE_KEY = 'siteTheme';
    
    function setTheme(themeName) {
        if (themeName === 'dark') {
            lightTheme.disabled = true;
            darkTheme.disabled = false;
            localStorage.setItem(STORAGE_KEY, 'dark');
        } else {
            lightTheme.disabled = false;
            darkTheme.disabled = true;
            localStorage.setItem(STORAGE_KEY, 'light');
        }
    }
    
    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Вешаем обработчики на кнопки
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
        });
    });
})();