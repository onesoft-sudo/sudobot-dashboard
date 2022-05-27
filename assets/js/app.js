window.insertAlert = function (parent, { content, type, expire, top } = { type: 'primary', expire: null, top: true }) {
    const id = Math.floor(Math.random() * 10000);
    const alert = `<div class="alert alert-${type ?? 'primary'}" id="alert-${id}">${content}</div>`

    if (!top)
        parent.innerHTML += alert;
    else
        parent.innerHTML = `${alert}${parent.innerHTML}`;
    
    if (expire) {
        setTimeout(() => document.querySelector(`#alert-${id}`).remove(), expire);
    }
}

window.$ = function (selector) {
    return document.querySelector(selector);
}

window.state = window.state || {};
window.methods = window.methods || {};

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('#processing')) {
        window.elements = {
            spinner: document.querySelector('#processing')
        };
    }
});

window.startProcess = () => {
    window.elements.spinner.classList.add('d-inline-block');
    document.querySelector('body').style.cursor = 'processing';
};

window.endProcess = () => {
    window.elements.spinner.classList.remove('d-inline-block');
    document.querySelector('body').style.cursor = 'inherit';
};