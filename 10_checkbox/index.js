const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleCheck(event) {
    let inBetween = false;

    if ((this === checkboxes[0]) && this.checked) {

        checkboxes.forEach(checkbox => checkbox.checked = true);
        return;

    } else if ((this === checkboxes[0]) && !this.checked) {

        checkboxes.forEach(checkbox => checkbox.checked = false);
        return;
    };

    if (event.shiftKey && this.checked) {

        checkboxes.forEach(checkbox => {

            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        });
    } else if (event.altKey && this.checked) {
        
        checkboxes.forEach((checkbox) => checkbox.checked = true);
    };


    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));