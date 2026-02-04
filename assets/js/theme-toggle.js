document.addEventListener('DOMContentLoaded', function() {
    let currentTheme = 'auto';
    try {
        currentTheme = localStorage.getItem('theme') || 'auto';
    } catch (e) {
        currentTheme = 'auto';
    }

    document.documentElement.setAttribute('data-theme', currentTheme);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) {
        return;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    themeToggleBtn.checked = currentTheme === 'dark' || (currentTheme === 'auto' && prefersDark);

    themeToggleBtn.addEventListener('change', function() {
        const theme = themeToggleBtn.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            // Ignore storage errors (privacy mode, etc.)
        }
    });
});
