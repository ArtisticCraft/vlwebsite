function setup() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme());
        setTheme(getPreferredTheme());
    });
    showActiveTheme(getPreferredTheme());
    setTheme(getPreferredTheme());
}


function setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
}

function getStoredTheme() {
    return localStorage.getItem('theme');
}

function setTheme(theme) {
    updateTheme()
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
}

function getPreferredTheme() {
    const forcedTheme = document.documentElement.getAttribute('data-bss-forced-theme');
    if (forcedTheme) return forcedTheme;

    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }

    const pageTheme = document.documentElement.getAttribute('data-bs-theme');

    if (pageTheme) {
        return pageTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateTheme() {
    var elements = document.getElementsByClassName("dropdown-menu")

    const currentColorMode = document.documentElement.getAttribute("data-bs-theme")

    for (var i = 0; i < elements.length; i++) {
        var element = elements.item(i)
        if (currentColorMode != 'dark') {
            element.setAttribute('data-bs-theme', 'light')
            continue
        }

        element.setAttribute('data-bs-theme', 'dark')
    }
}

function showActiveTheme(theme, focus = false) {
    const themeSwitchers = [].slice.call(document.querySelectorAll('.theme-switcher'));

    if (!themeSwitchers.length) return;

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
    });

    for (const themeSwitcher of themeSwitchers) {

        const btnToActivate = themeSwitcher.querySelector('[data-bs-theme-value="' + theme + '"]');
        if (btnToActivate) {
            btnToActivate.classList.add('active');
            btnToActivate.setAttribute('aria-pressed', 'true');
        }
    }
}


document.addEventListener('click', function (event) {
    const clickedElement = event.target;
    const theme = clickedElement.getAttribute('data-bs-theme-value');
    if (theme == null) {
        return
    }
    setStoredTheme(theme)
    setTheme(theme)
    showActiveTheme(theme)
});

setup();

document.addEventListener('click', function (event) {
    showActiveTheme(getPreferredTheme())
    setTheme(getPreferredTheme())
    updateTheme()
});

