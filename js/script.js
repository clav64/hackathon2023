// Browser compatability check

function browserCheck() {

    // if there is no browser storage available
    if (typeof (Storage) == "undefined") {

        document.getElementById("body") = "Sorry, this browser is not compatible with the applicaiton.";
        console.log("No browser storage available. Cannot run.");

    }

    
}


function runLife() {

    let lifeStart = new Date().getTime();


}


function runWork() {

    let workStart = new Date.getTime();

}


function stopLife() {

}


function stopWork() {

}