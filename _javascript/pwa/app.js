if ('serviceWorker' in navigator) {
  // Get Jekyll config from URL parameters
  const src = new URL(document.currentScript.src);
  const register = src.searchParams.get('register');
  const baseUrl = src.searchParams.get('baseurl');

  if (register) {
    const swUrl = `${baseUrl}/sw.min.js`;

    navigator.serviceWorker.register(swUrl).then((registration) => {
      // Silent auto-update on next navigation:
      // When a new service worker is waiting, activate it immediately in the
      // background. The current tab keeps using its already-loaded resources
      // (no forced reload). The next navigation naturally picks up the new
      // version because the new SW is now in control.
      const activateIfWaiting = () => {
        if (registration.waiting) {
          registration.waiting.postMessage('SKIP_WAITING');
        }
      };

      // Case 1: a new SW was already installed and waiting when the page loaded
      activateIfWaiting();

      // Case 2: a new SW finishes installing while the page is open
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing;
        if (installing) {
          installing.addEventListener('statechange', activateIfWaiting);
        }
      });
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}
