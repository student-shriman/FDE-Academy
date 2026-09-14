// Google Identity Services (GIS) integration for AI Academy

let gisLoadedPromise = null;

export function loadGoogleScript() {
  if (typeof window === 'undefined') return Promise.resolve(null);
  if (window.google?.accounts?.id) return Promise.resolve(window.google.accounts.id);

  if (!gisLoadedPromise) {
    gisLoadedPromise = new Promise((resolve) => {
      const existing = document.getElementById('google-gsi-client');
      if (existing) {
        resolve(window.google?.accounts?.id || null);
        return;
      }
      const script = document.createElement('script');
      script.id = 'google-gsi-client';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        resolve(window.google?.accounts?.id || null);
      };
      script.onerror = () => {
        console.warn('Google Identity Services SDK could not be loaded.');
        resolve(null);
      };
      document.head.appendChild(script);
    });
  }
  return gisLoadedPromise;
}

export async function initGoogleSignIn({ clientId, onCredentialResponse, buttonRef }) {
  if (!clientId) return false;
  
  const googleId = await loadGoogleScript();
  if (!googleId) return false;

  try {
    googleId.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response?.credential && onCredentialResponse) {
          onCredentialResponse(response.credential);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    if (buttonRef && buttonRef.current) {
      buttonRef.current.innerHTML = '';
      googleId.renderButton(buttonRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'pill',
        text: 'continue_with',
        width: 320,
        logo_alignment: 'left',
      });
    }

    // Attempt One-Tap prompt for returning users
    googleId.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // One-tap skipped or suppressed, standard button remains active
      }
    });

    return true;
  } catch (err) {
    console.error('Failed to initialize Google Identity:', err);
    return false;
  }
}
