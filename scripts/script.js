// Переключатель тем для проекта "Сложно сосредоточиться"
(function() {
    const THEME_STORAGE_KEY = 'userThemePreference';
    const DARK_THEME_CLASS = 'dark-theme';
    
    // Получение системной темы
    function getSystemThemePreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Применение темы
    function applyTheme(themeName) {
        const isDark = themeName === 'dark' || (themeName === 'auto' && getSystemThemePreference() === 'dark');
        
        if (isDark) {
            document.body.classList.add(DARK_THEME_CLASS);
        } else {
            document.body.classList.remove(DARK_THEME_CLASS);
        }
        
        try {
            localStorage.setItem(THEME_STORAGE_KEY, themeName);
        } catch(e) {
            console.warn('localStorage недоступен');
        }
    }
    
    // Инициализация темы при загрузке
    function initTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const initialTheme = savedTheme || 'auto';
        applyTheme(initialTheme);
        
        // Навешиваем обработчики на кнопки после загрузки DOM
        const buttons = document.querySelectorAll('.theme-menu__button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const themeValue = this.getAttribute('data-theme');
                applyTheme(themeValue);
                
                // Визуальная обратная связь
                buttons.forEach(btn => btn.style.opacity = '1');
                this.style.opacity = '0.7';
            });
        });
    }
    
    // Запуск после полной загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Следим за изменением системной темы (для режима auto)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (currentTheme === 'auto') {
            applyTheme('auto');
        }
    });
})();