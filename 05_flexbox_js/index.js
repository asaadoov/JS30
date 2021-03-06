const panels = document.querySelectorAll('.panel');

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

function toggleOpen() {
    this.classList.toggle('open');
};

function toggleActive(e) {
    console.log(e.propertyName);
    e.propertyName.includes('flex') ? this.classList.toggle('openActive') : null;
};