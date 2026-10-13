// Progressive enhancement: preserves all original page layout and adds accessible photo enlargement.
const dialog = document.createElement('dialog');
dialog.className = 'obe-photo-viewer';
dialog.setAttribute('aria-label', 'Enlarged photograph');
const close = document.createElement('button');
close.type = 'button'; close.className = 'obe-photo-close';
close.textContent = '×'; close.setAttribute('aria-label', 'Close photograph');
const figure = document.createElement('figure');
const image = document.createElement('img');
const caption = document.createElement('figcaption');
figure.append(image, caption); dialog.append(close, figure);
let previousFocus;
function openPhoto(photo) {
  if (!dialog.isConnected) document.body.append(dialog);
  previousFocus = photo; image.src = photo.currentSrc || photo.src;
  image.alt = photo.alt; caption.textContent = photo.alt;
  dialog.showModal(); close.focus();
}
function closePhoto() { dialog.close(); }
close.addEventListener('click', closePhoto);
dialog.addEventListener('click', event => { if (event.target === dialog) closePhoto(); });
dialog.addEventListener('close', () => { previousFocus?.focus(); });
function preparePhotos() {
  for (const photo of document.querySelectorAll('main img:not(.brand-logo)')) {
    if (photo.dataset.enlargeReady) continue;
    photo.dataset.enlargeReady = 'true'; photo.tabIndex = 0;
    photo.setAttribute('role', 'button'); photo.setAttribute('aria-haspopup', 'dialog');
    photo.setAttribute('aria-label', `Enlarge photograph: ${photo.alt}`);
    photo.addEventListener('click', () => openPhoto(photo));
    photo.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPhoto(photo); }
    });
  }
}
preparePhotos();
new MutationObserver(preparePhotos).observe(document.body, {childList:true, subtree:true});
