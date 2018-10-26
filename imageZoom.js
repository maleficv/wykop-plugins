// ==UserScript==
// @name     WykopImageZoom
// @version  1
// @include  https://www.wykop.pl/*
// @grant    Melcma
// ==/UserScript==

const avatars = document.querySelectorAll('.profile .avatar');

[...avatars].forEach(avatar => avatar.addEventListener('mouseenter', zoom));

function zoom(e) {
  const target = e.target;
  const container = target.parentNode;
  const url = target.src;
  const fullImage = url.replace(',q40', '');

  const tooltip = document.createElement('div');
  const img = document.createElement('img');

  target.parentNode.style.position = 'relative';
  target.parentNode.style.zIndex = '10';

  tooltip.style.position = 'absolute';
  tooltip.style.zIndex = '200';
  tooltip.style.left = '50px';
  tooltip.style.top = '0';

  img.style.width = '400px';
  img.style.height = 'auto';
  img.src = fullImage;
  img.style.borderRadius = '4px';

  container.appendChild(tooltip);
  tooltip.appendChild(img);

  target.addEventListener('mouseout', destroyTooltip);
}
  
function destroyTooltip(e) {
  const target = e.target;
  const container = target.parentNode;
  const tooltip = container.querySelector('div');

  container.style.zIndex = '1';
  container.removeChild(tooltip)
  target.removeEventListener('mouseout', destroyTooltip);
}
