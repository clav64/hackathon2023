var sw = {
    // (A) PROPERTIES
    etime : null, // html time display
    erst : null,  // html reset button
    ego : null,   // html start/stop button
    timer : null, // timer object
    now: 0,      // current elapsed time
      
    // (B) INITIALIZE
    init: () => {

        // if there is no browser storage available
        if (typeof (Storage) == "undefined") {

            document.getElementById("body") = "Sorry, this browser is not compatible with the applicaiton.";
            console.log("No browser storage available. Cannot run.");
            
            if (sw.read(lastRun) == "undefined") {
                sw.store(lastRun, Date.now());
            }
        }
        else {
            // Clear session storage for new session
            sessionStorage.clear();

            // check if it's a new day
            let today = Date.now();

            let lastRun = sw.read("lastRun");

            if (lastRun >= (Date.now() - 86400000)) {

                // reset stored values if it's a new day
                //sw.reset();

            }

            sw.store("lastRun", Date.now());

        }

        

      // (B1) GET HTML ELEMENTS
      sw.etime = document.getElementById("sw-time");
      sw.erst = document.getElementById("sw-rst");
      sw.ego = document.getElementById("sw-go");
  
      // (B2) ENABLE BUTTON CONTROLS
      sw.erst.onclick = sw.reset;
      sw.ego.onclick = sw.startWork;
      sw.erst.disabled = false;
      sw.ego.disabled = false;

      // START
      sw.startWork();
    },
  
    // (C) START WORKING TIME (countup)
    startWork : () => {
        clearInterval(sw.timer);
      sw.timer = setInterval(sw.tickForward, 1000);
      sw.ego.value = "Switch to Life";
      sw.ego.onclick = sw.startLife;
    },
  
    // (D) START LIFE TIME (count down)
    startLife : () => {
        clearInterval(sw.timer);
      sw.timer = setInterval(sw.tickBackward, 1000);
      sw.ego.value = "Switch to Work";
      sw.ego.onclick = sw.startWork;
    },
  
    // (E) TIMER ACTION
    tickForward : () => {
      // (E1) CALCULATE HOURS, MINS, SECONDS
      sw.now++;
        //let hours = sw.read(workHours), mins = sw.read(workMins), secs = sw.read(workSecs),
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

        /*// store work hours
        sw.store(workHours, hours);

        // store work mins
        sw.store(workMins, mins);

        // store work secs
        sw.store(workSecs, secs);*/
    },

    tickBackward : () => {
        // (E1) CALCULATE HOURS, MINS, SECONDS
        sw.now--;
        //let hours = sw.read(lifeHours), mins = sw.read(lifeMins), secs = sw.read(lifeSecs),
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

        /*// store life hours
        sw.store(lifeHours, hours);

        // store life mins
        sw.store(lifeMins, mins);

        // store life secs
        sw.store(lifeSecs, secs);*/
      },
  
    // (F) RESET
    reset : () => {
      if (sw.timer != null) { sw.startLife(); }
        sw.now = -1;
        /*// reset work stored values
        sw.store(workHours, 0);
        sw.store(workMins, 0);
        sw.store(workSecs, 0);

        // reset life stored values
        sw.store(lifeHours, 0);
        sw.store(lifeMins, 0);
        sw.store(lifeSecs, 0);*/

      sw.tickForward();
    },

    // (G) STORE DATA
    store: (storekey, val) => {
    // Write to localStorage - key val pair
            let key = storekey.toString();
            localStorage.setItem(storekey, val);   
    },

    // (H) READ DATA
    read: (readkey) => {
        // Read from localStorage - select entry by key name, return object
        
            let data = localStorage.getItem(readkey);
            return data;
    },
  };
window.addEventListener("load", sw.init);




