// ==UserScript==
// @name     WykopLastVisited
// @version  1
// @grant    Melcma
// ==/UserScript==

const now = (new Date).getTime();
const url = window.location.href.split('/');
const id = url[4];
const feed = url[3];

let selector;

if (feed === 'link') {
    selector = '.comments-stream > li .wblock';
} else if (feed === 'wpis') {
    selector = '.comments-stream .sub > li';
}

if (!feed) return;

const posts = document.querySelectorAll(selector);

function markNewPosts() {
    Array.prototype.forEach.call(posts, (post) => {
        const time = post.querySelector('time').getAttribute('datetime');
        const epoch = new Date(time).getTime();

        if (epoch > getLastVisit()[id]) {
            post.style.backgroundColor = '#1c3d75';
        }
    })
}

function getLastVisit() {
    return JSON.parse(localStorage.getItem('wykopLastVisit'));
}

function setLastVisit() {
    const data = getLastVisit() || {};
    data[id] = now;

    localStorage.setItem('wykopLastVisit', JSON.stringify(data));
}

if (!getLastVisit()) return;

markNewPosts();

setLastVisit();