/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const STATIC_QUERY_ERROR_MESSAGE = 'The result of this StaticQuery could not be fetched.';
const STATIC_QUERY_RECOVERY_KEY = 'gatsby-static-query-recovery';
const GATSBY_CACHE_NAME_HINTS = ['gatsby', 'workbox', 'offline-plugin'];

const getErrorMessage = event => {
  if (!event) {
    return '';
  }

  if (typeof event.message === 'string') {
    return event.message;
  }

  if (typeof event.reason === 'string') {
    return event.reason;
  }

  if (typeof event.reason?.message === 'string') {
    return event.reason.message;
  }

  if (typeof event.error?.message === 'string') {
    return event.error.message;
  }

  return '';
};

const hasRecoveredRecently = () => {
  try {
    return window.sessionStorage.getItem(STATIC_QUERY_RECOVERY_KEY) === 'true';
  } catch {
    return false;
  }
};

const markRecovery = () => {
  try {
    window.sessionStorage.setItem(STATIC_QUERY_RECOVERY_KEY, 'true');

    window.setTimeout(() => {
      window.sessionStorage.removeItem(STATIC_QUERY_RECOVERY_KEY);
    }, 10000);
  } catch {
    // Ignore storage failures and continue with a best-effort reload.
  }
};

const unregisterServiceWorkers = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.allSettled(registrations.map(registration => registration.unregister()));
};

const clearGatsbyCaches = async () => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return;
  }

  const cacheNames = await window.caches.keys();
  const cacheNamesToDelete = cacheNames.filter(cacheName =>
    GATSBY_CACHE_NAME_HINTS.some(hint => cacheName.includes(hint)),
  );

  await Promise.allSettled(cacheNamesToDelete.map(cacheName => window.caches.delete(cacheName)));
};

const recoverFromStaticQueryError = async event => {
  const message = getErrorMessage(event);

  if (!message.includes(STATIC_QUERY_ERROR_MESSAGE) || hasRecoveredRecently()) {
    return;
  }

  markRecovery();

  await Promise.allSettled([unregisterServiceWorkers(), clearGatsbyCaches()]);

  window.location.reload();
};

export const onClientEntry = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('error', recoverFromStaticQueryError);
  window.addEventListener('unhandledrejection', recoverFromStaticQueryError);

  await Promise.allSettled([unregisterServiceWorkers(), clearGatsbyCaches()]);
};
