if ('serviceWorker' in navigator) {
  const src = new URL(document.currentScript.src);
  const register = src.searchParams.get('register');
  const baseUrl = src.searchParams.get('baseurl');

  if (register) {
    const swUrl = `${baseUrl}/sw.min.js`;

    navigator.serviceWorker.register(swUrl).then((registration) => {
      const activateIfWaiting = () => {
        if (registration.waiting) {
          registration.waiting.postMessage('SKIP_WAITING');
        }
      };

      activateIfWaiting();

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
