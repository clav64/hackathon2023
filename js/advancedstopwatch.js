var sw = {
    // (A) PROPERTIES
    etime : null, // html time display
    erst : null,  // html reset button
    ego : null,   // html start/stop button
    timer : null, // timer object
    now : 0,      // current elapsed time

    // (B) INITIALIZE
    init : () => {
        // (B1) GET HTML ELEMENTS
        sw.etime = document.getElementById("sw-time");
        sw.erst = document.getElementById("sw-rst");
        sw.ego = document.getElementById("sw-go");

        // (B2) ENABLE BUTTON CONTROLS
        sw.erst.onclick = sw.reset;
        sw.ego.onclick = sw.start(true);
        sw.erst.disabled = false;
        sw.ego.disabled = false;
    },

    // (D) START LIFE TIME (count down)
    start : (work) => {
        clearInterval(sw.timer);
        if (work === true) {
            sw.timer = setInterval(() => sw.tick(true), 1000);
            sw.ego.value = "Switch to Life";
            sw.ego.onclick = sw.start(false);
        } else {
            sw.timer = setInterval(() => sw.tick(false), 2000);
            sw.ego.value = "Switch to Work";
            sw.ego.onclick = sw.start(true);
        }
    },

    // (E) TIMER ACTION
    tick : (forward) => {
        // (E1) CALCULATE HOURS, MINS,
        if (forward === true) {
            sw.now++;
        } else {
            sw.now--;
        }
        let hours = 0, mins = 0, secs = 0,
            remain = sw.now;
        hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        mins = Math.floor(remain / 60);
        remain -= mins * 60;
        secs = remain;

        // (E2) UPDATE THE DISPLAY TIMER
        if (hours<10) { hours = "0" + hours; }
        if (mins<10) { mins = "0" + mins; }
        if (secs<10) { secs = "0" + secs; }
        sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    },

    // (F) RESET
    reset : () => {
        if (sw.timer != null) { sw.start(false); }
        sw.now = -1;
        sw.tick(true);
    }
};
window.addEventListener("load", sw.init);