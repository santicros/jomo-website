import { extension_url } from '../../_data/metadata.json';
/*
function getBrowser() {
  const userAgent = navigator.userAgent;
  if ((userAgent.indexOf('Opera') || userAgent.indexOf('OPR')) != -1) {
    return 'Opera';
  } else if (userAgent.indexOf('Edg') != -1) {
    return 'Edge';
  } else if (userAgent.indexOf('Brave') != -1) {
    return 'Brave';
  } else if (userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  } else if (userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  } else if (
    userAgent.indexOf('MSIE') != -1 ||
    !!document.documentMode == true
  ) {
    return 'IE';
  } else {
    return 'unknown';
  }
}

const browserName = getBrowser();

const unsuportedBrowsers = ['Safari', 'IE', 'unknown'];
const urls = {
  Firefox: extension_url.firefox,
  Chrome: extension_url.chrome,
};
*/

document.documentElement.dataset.homeIllustration = 'limited';

window.addEventListener('DOMContentLoaded', (event) => {
  const els = document.querySelectorAll('input');
  els.forEach((el) => {
    el.addEventListener('change', (e) => {
      document.documentElement.dataset.homeIllustration = `${e.target.value}`;
    });
  });
  /*
   const linkEls = document.querySelectorAll('.extension-link-browser');
   if (
     unsuportedBrowsers.some(
       (unsuportedBrowser) => browserName === unsuportedBrowser
     )
   )
     return;
   linkEls.forEach((el) => {
     el.textContent = `Add to ${browserName}`;
     if (browserName === 'Firefox') {
       el.href = urls[browserName];
     }
   });
   */
});
