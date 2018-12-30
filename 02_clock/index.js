// selectors
const secHand = document.querySelector('.secHand');
const minHand = document.querySelector(".minHand");
const hourHand = document.querySelector(".hourHand");
const hand = document.querySelector(".hand");

function setDate() {
    const now = new Date();
    const sec = now.getSeconds();
    const secDeg = ((sec / 60) * 360) + 90;
    secHand.style.transform = `rotate(${secDeg}deg)`;

    const min = now.getMinutes();
    const minDeg = ((min / 60) * 360) + 90;
    minHand.style.transform = `rotate(${minDeg}deg)`;

    const hour = now.getHours();
    const hourDeg = ((hour / 12) * 360) + 90;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

    if (secDeg == 360 || minDeg == 360 || hourDeg == 360) {
        secHand.style.transition = 'all 0s';
        minHand.style.transition = 'all 0s';
        hourHand.style.transition = 'all 0s';
    };
};

setInterval(setDate, 1000);

// setDate();