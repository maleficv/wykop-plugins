// ==UserScript==
// @name     WykopPlusFilter
// @version  1
// @grant    Melcma
// ==/UserScript==

const bar = document.querySelector('.nav.bspace.rbl-block ul');

const filterButton = document.createElement('BUTTON');
filterButton.innerHTML = 'filtruj';
filterButton.style.marginTop = '6px';
filterButton.addEventListener('click', handleClick);

bar.appendChild(filterButton);

function handleClick() {
    if (filterButton.classList.contains('active')) {
        return restore();
    }

    return filter();
}

function filter() {
    const elements = document.getElementsByClassName('vC');

    filterButton.classList.add('active');

    Array.prototype.map.call(elements, (el, index) => {
        if (index === 0) return;
        const span = el.getElementsByTagName('SPAN')[0];
        if (parseInt(span.innerHTML) < 100) {
            el.closest('li').style.display = 'none';
        }
    });

    localStorage.setItem('wykopFilterByPlus', 'true');
}

function restore() {
    const elements = document.getElementsByClassName('vC');

    filterButton.classList.remove('active');

    Array.prototype.map.call(elements, (el) => {
        const span = el.getElementsByTagName('SPAN')[0];
        if (parseInt(span.innerHTML) < 100) {
            el.closest('li').style.display = 'block';
        }
    });

    localStorage.removeItem('wykopFilterByPlus');
}

document.querySelector('.more .affect.ajax').addEventListener('click', () => {
    setTimeout(() => {
        filter();
    }, 1000)
});

if (localStorage.getItem('wykopFilterByPlus')) {
    filter();
}