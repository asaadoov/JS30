const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
};

function toggleActive(e) {
    e.propertyName.includes('flex') ? this.classList.toggle('openActive') : null;
};


panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));