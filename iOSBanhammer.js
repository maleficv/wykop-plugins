// ==UserScript==
// @name     iOS banhammer
// @version  1
// @grant    Melcma
// ==/UserScript==


// logic
const container = document.getElementById('itemsStream');
const users = container.getElementsByClassName('author');

Array.prototype.forEach.call(users, function(user) {
    const ios = user.innerHTML.indexOf('iOS') > -1;

    if (!ios) return;

    const parent = user.parentNode;

    parent.getElementsByClassName('text')[0].innerHTML = 'jestem plebem';
});