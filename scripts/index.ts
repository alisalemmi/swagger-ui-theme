const body = document.querySelector('body');

function getDefaultTheme(): boolean {
  if (!window.matchMedia) return false;

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  useDefaultTheme = true;

  media.addEventListener('change', ({ matches }) => {
    if (useDefaultTheme) {
      darkTheme = matches;
      setTheme(darkTheme);
    }
  });

  return media.matches;
}

function store(isDark: boolean) {
  useDefaultTheme = false;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function restore(): boolean | undefined {
  const theme = localStorage.getItem('theme');

  if (theme === 'dark') return true;
  else if (theme === 'light') return false;
  else return getDefaultTheme();
}

function setTheme(isDark: boolean) {
  if (isDark === true) {
    body.classList.add('dark');
    body.classList.remove('light');
  } else if (isDark === false) {
    body.classList.add('light');
    body.classList.remove('dark');
  }
}

function setToggleHandler() {
  const toggleBtn = document.querySelector('.topbar .wrapper') as HTMLElement;

  toggleBtn.addEventListener('click', () => {
    darkTheme = !darkTheme;
    setTheme(darkTheme);
    store(darkTheme);
  });
}

// initialize
let useDefaultTheme = false;
let darkTheme = restore();
setTheme(darkTheme);

// wait until swagger rendered
const renderInterval = setInterval(() => {
  if (
    document.readyState === 'complete' &&
    document.getElementById('swagger-ui')
  ) {
    clearInterval(renderInterval);
    setToggleHandler();
  }
}, 200);
