var sw = {
    // (A) PROPERTIES
    etime : null, // html time display
    erst : null,  // html reset button
    ego : null,   // html start/stop button
    timer : null, // timer object
    total: 0,      // current elapsed time
    work: 0,
    life: 0,

    // (B) INITIALIZE
    init: () => {

        // if there is no browser storage available
        if (typeof (Storage) == "undefined") {

            document.getElementById("body") = "Sorry, this browser is not compatible with the applicaiton.";
            console.log("No browser storage available. Cannot run.");
            
            
        }

        // if there is no value stored for lastRun
        if (sw.read("lastRun") == "undefined" || sw.read("lastRun") == null) {

            // clear the browser storage
            localStorage.clear();

            // store the time now as the lastRun value
            sw.store("lastRun", Date.now());
        }
        else {
            // check if it's a new day
            
            // get the last run value
            let lastRun = Number(sw.read("lastRun"));

            // reset the stored lastRun value if it's been more than 24 hours
            if (Number((lastRun - Date.now())) >= 86400000) {
                
                sw.store("lastRun", Date.now())
                st.store("total", total);
                st.store("life", life);
                st.store("work", work);

            }

            

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
        
      sw.timer = setInterval(sw.tickWork, 1000);
      sw.ego.value = "Switch to Life";
      sw.ego.onclick = sw.startLife;
    },
  
    // (D) START LIFE TIME (count down)
    startLife : () => {
        clearInterval(sw.timer);
        
      sw.timer = setInterval(sw.tickLife, 1000);
      sw.ego.value = "Switch to Work";
      sw.ego.onclick = sw.startWork;
    },
  
    // (E) TICK
    tickWork : () => {
        sw.work++;
        sw.total++;
        sw.store("work", sw.work);
        sw.store("total", sw.total);
        sw.display;        
    },

    tickLife : () => {
        sw.life++;
        sw.total++;
        sw.store("life", sw.life);
        sw.store("total", sw.total);  
        sw.display;
        
      },
  
    // (F) RESET
    reset : () => {
      if (sw.timer != null) { sw.startLife(); }
        sw.now = -1;
        

      sw.tickWork();
    },

    // (G) STORE DATA
    store: (storekey, val) => {
    // Write to localStorage - key val pair
        let key = storekey.toString();
        localStorage.setItem(storekey.toString(), val.toString());   
    },

    // (H) READ DATA
    read: (readkey) => {
        // Read from localStorage - select entry by key name, return object
        
            let data = localStorage.getItem(readkey);
            return data;
    },

    // (H) DISPLAY UPDATE
    display: () => {
        let hours = 0, mins = 0, secs = 0, remain = sw.work - sw.life;
        hours = Math.floor(remain / 3600);
        remain -= hours * 3600;
        mins = Math.floor(remain / 60);
        remain -= mins * 60;
        secs = remain;
        if (hours < 10) { hours = "0" + hours; }
        if (mins < 10) { mins = "0" + mins; }
        if (secs < 10) { secs = "0" + secs; }
        sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    },
  };
window.addEventListener("load", sw.init);




