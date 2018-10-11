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

const elements = document.getElementsByClassName('vC');

function handleClick() {
    if (filterButton.classList.contains('active')) {
        return restore();
    }

    return filter();

}

function filter() {
    filterButton.classList.add('active');

    Array.prototype.map.call(elements, (el) => {
        const span = el.getElementsByTagName('SPAN')[0];
        if (parseInt(span.innerHTML) < 100) {
            el.closest('li').style.display = 'none';
        }
    });

    localStorage.setItem('wykopFilterByPlus', 'true');
}

function restore() {
    filterButton.classList.remove('active');

    Array.prototype.map.call(elements, (el) => {
        const span = el.getElementsByTagName('SPAN')[0];
        if (parseInt(span.innerHTML) < 100) {
            el.closest('li').style.display = 'block';
        }
    });

    localStorage.removeItem('wykopFilterByPlus');
}

if (localStorage.getItem('wykopFilterByPlus')) {
    filter();
}