(() => {
  const desktopNodes = Array.from(document.querySelectorAll('[data-display="desktop"]'));
  const mobileNodes = Array.from(document.querySelectorAll('[data-display="mobile"]'));

  if (!desktopNodes.length && !mobileNodes.length) {
    return;
  }

  const applyVisibility = (isMobile) => {
    desktopNodes.forEach((node) => {
      if (isMobile) {
        node.setAttribute('aria-hidden', 'true');
      } else {
        node.setAttribute('aria-hidden', 'false');
      }
    });

    mobileNodes.forEach((node) => {
      if (isMobile) {
        node.setAttribute('aria-hidden', 'false');
      } else {
        node.setAttribute('aria-hidden', 'true');
      }
    });
  };

  const syncVisibility = () => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.matchMedia) {
      applyVisibility(window.matchMedia('(max-width: 720px)').matches);
    } else {
      applyVisibility(window.innerWidth <= 720);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncVisibility, { once: true });
  } else {
    syncVisibility();
  }

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(max-width: 720px)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', syncVisibility);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(syncVisibility);
    }
  } else {
    window.addEventListener('resize', syncVisibility);
  }
})();
