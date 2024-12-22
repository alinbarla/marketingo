import { debug } from './debug';

let deferredPrompt: any = null;
const isWebContainerEnvironment = window.location.hostname.includes('webcontainer');

export function initPWA() {
  // Skip PWA initialization in WebContainer environment
  if (isWebContainerEnvironment) {
    debug.log('info', 'PWA features disabled in WebContainer environment');
    return;
  }

  // Only show install prompt if not already installed
  if (localStorage.getItem('pwa-installed')) {
    return;
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPrompt();
  });

  window.addEventListener('appinstalled', () => {
    localStorage.setItem('pwa-installed', 'true');
    debug.log('info', 'PWA was installed');
  });
}

function showInstallPrompt() {
  if (!deferredPrompt) return;

  const installBanner = document.createElement('div');
  installBanner.className = 'fixed top-0 left-0 right-0 bg-indigo-600 text-white p-4 flex items-center justify-between z-50 animate-fadeIn';
  installBanner.innerHTML = `
    <div class="flex items-center">
      <span class="mr-2">📱</span>
      <span>¿Deseas instalar MotoService en tu dispositivo?</span>
    </div>
    <div class="flex gap-2">
      <button id="pwa-install" class="px-4 py-1 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50">
        Instalar
      </button>
      <button id="pwa-dismiss" class="px-4 py-1 bg-transparent border border-white rounded-lg hover:bg-indigo-700">
        Ahora no
      </button>
    </div>
  `;

  document.body.appendChild(installBanner);

  document.getElementById('pwa-install')?.addEventListener('click', async () => {
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        debug.log('info', 'User accepted the install prompt');
      }
    } catch (error) {
      debug.log('error', 'Error showing install prompt:', error);
    } finally {
      deferredPrompt = null;
      installBanner.remove();
    }
  });

  document.getElementById('pwa-dismiss')?.addEventListener('click', () => {
    installBanner.remove();
  });
}