// this program needs to count the number of seconds spent in each state and compare them


// declare some global vars here

// current state boolean - life == false / work == true
let state = false;

// time spent in life mode (seconds)
let lifeTime = 0;

// time spent in work mode (seconds)
let workTime = 0;

// script start time
let startTime = new Date().getTime();



// Browser compatability check - ensure the browser supports local storage - if it does, clear the session storage - THIS SHOULD BE RUN ON DOCUMENT LOAD
function browserCheck() {

    // if there is no browser storage available
    if (typeof (Storage) == "undefined") {

        document.getElementById("body") = "Sorry, this browser is not compatible with the applicaiton.";
        console.log("No browser storage available. Cannot run.");
        break;

    }
    else {
        // Clear session storage for new session
        sessionStorage.clear();
    }

    
}


// load any existing data from local storage to continue previous usage of the app - THIS SHOULD BE RUN ON DOCUMENT LOAD
function loadData() {

}


function runLife() {

    // store the last time life was started
    let lastLifeStart = new Date().getTime();


}


function runWork() {

    //store the last time work was started
    let lastWorkStart = new Date.getTime();

}


// Write to localStorage - key val pair - val == json obj
function storeLocal(key, val) {

    
    let key = key.toString();
    localStorage.setItem(key, JSON.stringify(UserObj));
}
// Read from localStorage - select entry by key name, return object
function readLocal(key) {
    let object = JSON.parse(localStorage.getItem(key));
    return object;
}



