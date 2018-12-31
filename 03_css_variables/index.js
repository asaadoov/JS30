const inputs = document.querySelectorAll(".controls input");

inputs.forEach(input => {
    input.addEventListener('change', changeHandeler);
    input.addEventListener('mousemove', changeHandeler);
});

function changeHandeler() {
    const suffix = this.dataset.sizing || '';
    // console.log(this);
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}