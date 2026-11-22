// ======================================
// LIVESIM
// VERSION 0.0.1
// MAIN APPLICATION
// ======================================


const LiveSim = {

    name: "LiveSim",

    version: "0.0.1",

    language: "id",

    initialized: false

};


// ======================================
// THEME SYSTEM
// ======================================

const themeButton =
    document.getElementById("themeButton");


function setTheme(theme) {

    document.body.classList.toggle(
        "light",
        theme === "light"
    );

    themeButton.textContent =
        theme === "light" ? "☾" : "☀";

    localStorage.setItem(
        "livesim_theme",
        theme
    );

}


// ======================================
// INITIALIZE THEME
// ======================================

const savedTheme =
    localStorage.getItem("livesim_theme")
    || "dark";


setTheme(savedTheme);


themeButton.addEventListener("click", () => {

    const newTheme =
        document.body.classList.contains("light")
        ? "dark"
        : "light";

    setTheme(newTheme);

});


// ======================================
// APPLICATION INITIALIZATION
// ======================================

function initializeLiveSim() {

    console.log(
        "LiveSim initialized successfully."
    );

    console.log(
        "Version:",
        LiveSim.version
    );

    LiveSim.initialized = true;

}


initializeLiveSim();
