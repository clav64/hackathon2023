var sw = {
    // PROPERTIES
    etime: null, // html time display
    erst: null,  // html reset button
    ego: null,   // html start/stop button
    timer: null, // timer object
    now: 0,      // current elapsed time
    timevalue: 1,
    state: null, // current work/living state
    

    // INITIALIZE
    init: () => {
        // if there is no browser storage available
        if (typeof (Storage) == "undefined") {

            document.getElementById("body") = "Sorry, this browser is not compatible with the applicaiton.";
            console.log("No browser storage available. Cannot run.");

        }

        // GET HTML ELEMENTS
        sw.etime = document.getElementById("sw-time");
        sw.erst = document.getElementById("sw-rst");
        sw.ego = document.getElementById("sw-go");
        

        // ENABLE BUTTON CONTROLS
        sw.erst.onclick = sw.reset;
        sw.ego.onclick = sw.startWork;
        sw.erst.disabled = false;
        sw.ego.disabled = false;

        // Run last state, if any
        if (sw.read("lastState") != "null" || sw.read("lastState") != "undefined") {
            console.log("Resuming last program state.");
            state = Boolean(sw.read("lastState"));
            sw.now = Number(sw.read("time"));
            sw.display();
            if (state === true) {
                sw.startWork();
            }
            if (state === false) {
                sw.startLife();
            }
        }
    },


    // START WORKING TIME (countup)
    startWork: () => {
        clearInterval(sw.timer);
        sw.timer = setInterval(() => sw.tick(true), 1000);
        sw.ego.value = "Switch to Life";
        document.getElementById("statusText").innerHTML = "<h1>CURRENTLY WORKING</h1>";
        console.log("changed text");
        sw.ego.onclick = sw.startLife;
    },

    // START LIFE TIME (count down)
    startLife: () => {
        clearInterval(sw.timer);
        sw.timer = setInterval(() => sw.tick(false), 2000);
        sw.ego.value = "Switch to Work";
        document.getElementById("statusText").innerHTML = "<h1>CURRENTLY LIVING</h1>"
        console.log("dfiffenejnefjhsdbjhfsdjh");
        sw.ego.onclick = sw.startWork;
    },

    // TIMER ACTION
    tick: (forward) => {
        // (E1) CALCULATE HOURS, MINS,
        if (forward === true) {
            sw.now = sw.now + sw.timevalue;
            state = true;
            
        }
        else {
            sw.now = sw.now - sw.timevalue;
            state = false;
            
        }
        if (sw.now < 0) {
            sw.now = 1;
            sw.timevalue = sw.timevalue * -1;
        }
        sw.store("time", sw.now);
        sw.store("lastState", state);
        sw.display();
    },

    // RESET
    reset: () => {
        if (sw.timer != null) { sw.startLife(); }
        sw.now = -1;
        sw.tick(true);

    },

    // STORE DATA
    store: (storekey, val) => {
        // Write to localStorage - key val pair
        let key = storekey.toString();
        localStorage.setItem(storekey.toString(), val.toString());
    },

    // READ DATA
    read: (readkey) => {
        // Read from localStorage - select entry by key name, return object
        let data = localStorage.getItem(readkey);
        return data;
    },

    // UPDATE THE DISPLAY TIMER
    display: () => {
        let hours = 0, mins = 0, secs = 0,
        remain = sw.now;
        hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        mins = Math.floor(remain / 60);
        remain -= mins * 60;
        secs = remain;
        if (hours < 10) { hours = "0" + hours; }
        if (mins < 10) { mins = "0" + mins; }
        if (secs < 10) { secs = "0" + secs; }
        sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    }

};
window.addEventListener("load", sw.init);