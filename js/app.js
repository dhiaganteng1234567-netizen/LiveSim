// ==========================================
// LIVESIM
// MAIN APPLICATION
// VERSION 0.0.1
// ==========================================


import {

    supabase,

    LiveSimConfig

} from "./supabase.js";


// ==========================================
// APPLICATION
// ==========================================


const LiveSim = {

    initialized: false,

    databaseConnected: false

};


// ==========================================
// ELEMENTS
// ==========================================


const themeButton =

document.getElementById("themeButton");


const connectionDot =

document.getElementById("connectionDot");


const connectionText =

document.getElementById("connectionText");


const exploreButton =

document.getElementById("exploreButton");


// ==========================================
// THEME SYSTEM
// ==========================================


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


// ==========================================
// INITIALIZE THEME
// ==========================================


const savedTheme =

localStorage.getItem("livesim_theme")

|| "dark";


setTheme(savedTheme);


themeButton.addEventListener(

    "click",

    () => {

        const nextTheme =

        document.body.classList.contains("light")

        ? "dark"

        : "light";


        setTheme(nextTheme);

    }

);


// ==========================================
// DATABASE STATUS
// ==========================================


function updateConnectionStatus(

    status,

    message

) {

    connectionDot.classList.remove(

        "connected",

        "error"

    );


    if (status === "connected") {

        connectionDot.classList.add(

            "connected"

        );

    }


    if (status === "error") {

        connectionDot.classList.add(

            "error"

        );

    }


    connectionText.textContent = message;

}


// ==========================================
// TEST DATABASE CONNECTION
// ==========================================


async function testDatabaseConnection() {

    updateConnectionStatus(

        "connecting",

        "Connecting..."

    );


    try {

        const {

            error

        } = await supabase

            .from("profiles")

            .select("id")

            .limit(1);


        if (error) {

            throw error;

        }


        LiveSim.databaseConnected = true;


        updateConnectionStatus(

            "connected",

            "Database Connected"

        );


        console.log(

            "[LiveSim] Database connected."

        );

    }

    catch (error) {

        LiveSim.databaseConnected = false;


        updateConnectionStatus(

            "error",

            "Connection Error"

        );


        console.error(

            "[LiveSim] Database error:",

            error.message

        );

    }

}


// ==========================================
// EXPLORE BUTTON
// ==========================================


exploreButton.addEventListener(

    "click",

    () => {

        document

        .querySelector(".system-section")

        .scrollIntoView({

            behavior: "smooth"

        });

    }

);


// ==========================================
// INITIALIZE
// ==========================================


async function initializeLiveSim() {

    console.log(

        "================================"

    );


    console.log(

        LiveSimConfig.name

    );


    console.log(

        "Version:",

        LiveSimConfig.version

    );


    console.log(

        "Initializing..."

    );


    await testDatabaseConnection();


    LiveSim.initialized = true;


    console.log(

        "LiveSim initialized."

    );


    console.log(

        "================================"

    );

}


initializeLiveSim();
