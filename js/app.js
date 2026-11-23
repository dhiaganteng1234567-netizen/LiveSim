// ==========================================
// LIVESIM
// AUTHENTICATION ENGINE
// VERSION 0.0.1
// ==========================================


import {

    supabase,

    LiveSimConfig

} from "./supabase.js";


// ==========================================
// CONFIGURATION
// ==========================================


const EMAIL_DOMAIN =

LiveSimConfig.authDomain;


const MIN_PASSWORD_LENGTH = 10;


// ==========================================
// ELEMENTS
// ==========================================


const loginTab =

document.getElementById("loginTab");


const registerTab =

document.getElementById("registerTab");


const loginForm =

document.getElementById("loginForm");


const registerForm =

document.getElementById("registerForm");


const formTitle =

document.getElementById("formTitle");


const formDescription =

document.getElementById("formDescription");


const statusMessage =

document.getElementById("statusMessage");


const sessionPanel =

document.getElementById("sessionPanel");


const sessionUsername =

document.getElementById("sessionUsername");


const loginButton =

document.getElementById("loginButton");


const registerButton =

document.getElementById("registerButton");


const logoutButton =

document.getElementById("logoutButton");


const themeButton =

document.getElementById("themeButton");


// ==========================================
// COUNTRY ISO 3166-1
// ==========================================


const COUNTRY_CODES = `

AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ

BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ

CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ

DE DJ DK DM DO DZ

EC EE EG EH ER ES ET

FI FJ FK FM FO FR

GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY

HK HM HN HR HT HU

ID IE IL IM IN IO IQ IR IS IT

JE JM JO JP

KE KG KH KI KM KN KP KR KW KY KZ

LA LB LC LI LK LR LS LT LU LV LY

MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ

NA NC NE NF NG NI NL NO NP NR NU NZ

OM

PA PE PF PG PH PK PL PM PN PR PS PT PW PY

QA

RE RO RS RU RW

SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ

TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ

UA UG UM US UY UZ

VA VC VE VG VI VN VU

WF WS

YE YT

ZA ZM ZW

`;


// ==========================================
// COUNTRY LIST INITIALIZATION
// ==========================================


function initializeCountries() {

    const select =

    document.getElementById(

        "registerNationality"

    );


    const codes = COUNTRY_CODES

        .trim()

        .split(/\s+/);


    let displayNames;


    try {

        displayNames = new Intl.DisplayNames(

            ["id"],

            {

                type: "region"

            }

        );

    }

    catch {

        displayNames = null;

    }


    const countries = codes.map(code => ({

        code,

        name: displayNames

            ? displayNames.of(code)

            : code

    }));


    countries.sort((a, b) =>

        a.name.localeCompare(b.name, "id")

    );


    for (const country of countries) {

        const option =

        document.createElement("option");


        option.value = country.code;


        option.textContent =

        country.name;


        select.appendChild(option);

    }

}


initializeCountries();


// ==========================================
// STATUS MESSAGE
// ==========================================


function showMessage(message, type) {

    statusMessage.hidden = false;

    statusMessage.textContent = message;

    statusMessage.className =

        "status-message " + type;

}


function clearMessage() {

    statusMessage.hidden = true;

    statusMessage.textContent = "";

    statusMessage.className =

        "status-message";

}


// ==========================================
// LOADING STATE
// ==========================================


function setLoading(button, loading, originalText) {

    button.disabled = loading;

    button.querySelector("span").textContent =

        loading

        ? "PLEASE WAIT..."

        : originalText;

}


// ==========================================
// USERNAME VALIDATION
// ==========================================


function validateUsername(username) {

    return /^[a-z0-9_]{3,20}$/.test(

        username

    );

}


// ==========================================
// PASSWORD VALIDATION
// ==========================================


function validatePassword(password) {

    if (password.length < MIN_PASSWORD_LENGTH) {

        return false;

    }


    if (!/[a-z]/.test(password)) {

        return false;

    }


    if (!/[A-Z]/.test(password)) {

        return false;

    }


    if (!/[0-9]/.test(password)) {

        return false;

    }


    return true;

}


// ==========================================
// USERNAME TO INTERNAL AUTH IDENTITY
// ==========================================


function usernameToEmail(username) {

    return (

        username.toLowerCase()

        + "@"

        + EMAIL_DOMAIN

    );

}


// ==========================================
// FORM SWITCHING
// ==========================================


function showLogin() {

    loginForm.hidden = false;

    registerForm.hidden = true;


    loginTab.classList.add("active");

    registerTab.classList.remove("active");


    formTitle.textContent =

        "Welcome Back";


    formDescription.textContent =

        "Access your LiveSim account.";


    clearMessage();

}


function showRegister() {

    loginForm.hidden = true;

    registerForm.hidden = false;


    registerTab.classList.add("active");

    loginTab.classList.remove("active");


    formTitle.textContent =

        "Create Your Identity";


    formDescription.textContent =

        "Establish your identity in LiveSim.";


    clearMessage();

}


loginTab.addEventListener(

    "click",

    showLogin

);


registerTab.addEventListener(

    "click",

    showRegister

);


// ==========================================
// REGISTRATION
// ==========================================


registerForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        clearMessage();


        const username =

        document

        .getElementById("registerUsername")

        .value

        .trim()

        .toLowerCase();


        const gender =

        document

        .getElementById("registerGender")

        .value;


        const nationality =

        document

        .getElementById("registerNationality")

        .value;


        const ageBand =

        document

        .getElementById("registerAgeBand")

        .value;


        const password =

        document

        .getElementById("registerPassword")

        .value;


        const confirmPassword =

        document

        .getElementById("confirmPassword")

        .value;


        const agreement =

        document

        .getElementById("termsAgreement")

        .checked;


        // USERNAME

        if (!validateUsername(username)) {

            showMessage(

                "Username harus 3–20 karakter dan hanya menggunakan huruf kecil, angka, atau underscore.",

                "error"

            );

            return;

        }


        // PASSWORD

        if (!validatePassword(password)) {

            showMessage(

                "Password harus minimal 10 karakter dan mengandung huruf kecil, huruf besar, serta angka.",

                "error"

            );

            return;

        }


        // CONFIRM PASSWORD

        if (password !== confirmPassword) {

            showMessage(

                "Password confirmation does not match.",

                "error"

            );

            return;

        }


        // REQUIRED FIELDS

        if (

            !gender ||

            !nationality ||

            !ageBand

        ) {

            showMessage(

                "Lengkapi seluruh informasi registrasi.",

                "error"

            );

            return;

        }


        // AGREEMENT

        if (!agreement) {

            showMessage(

                "Persetujuan ketentuan dan privasi diperlukan.",

                "error"

            );

            return;

        }


        setLoading(

            registerButton,

            true,

            "CREATE YOUR ACCOUNT"

        );


        try {

            const internalEmail =

            usernameToEmail(username);


            const {

                data,

                error

            } = await supabase.auth.signUp({

                email: internalEmail,

                password: password,

                options: {

                    data: {

                        username: username,

                        gender: gender,

                        nationality: nationality,

                        real_age_band: ageBand

                    }

                }

            });


            if (error) {

                throw error;

            }


            if (!data.user) {

                throw new Error(

                    "Account creation failed."

                );

            }


            if (!data.session) {

                showMessage(

                    "Akun dibuat, tetapi sesi belum aktif. Periksa konfigurasi Confirm Email di Supabase.",

                    "error"

                );

                return;

            }


            showMessage(

                "Your LiveSim identity has been created successfully.",

                "success"

            );


            registerForm.reset();


            await updateSession(data.session);


        }

        catch (error) {

            console.error(

                "[LiveSim Registration]",

                error.message

            );


            showMessage(

                "Registrasi gagal. Username mungkin sudah digunakan atau terjadi kesalahan pada autentikasi/database.",

                "error"

            );

        }

        finally {

            setLoading(

                registerButton,

                false,

                "CREATE YOUR ACCOUNT"

            );

        }

    }

);


// ==========================================
// LOGIN
// ==========================================


loginForm.addEventListener(

    "submit",

    async event => {

        event.preventDefault();


        clearMessage();


        const username =

        document

        .getElementById("loginUsername")

        .value

        .trim()

        .toLowerCase();


        const password =

        document

        .getElementById("loginPassword")

        .value;


        if (!validateUsername(username)) {

            showMessage(

                "Username tidak valid.",

                "error"

            );

            return;

        }


        setLoading(

            loginButton,

            true,

            "ENTER LIVESIM"

        );


        try {

            const internalEmail =

            usernameToEmail(username);


            const {

                data,

                error

            } = await supabase.auth.signInWithPassword({

                email: internalEmail,

                password: password

            });


            if (error) {

                throw error;

            }


            await updateSession(data.session);


            showMessage(

                "Login successful.",

                "success"

            );


        }

        catch (error) {

            console.error(

                "[LiveSim Login]",

                error.message

            );


            showMessage(

                "Username atau password salah.",

                "error"

            );

        }

        finally {

            setLoading(

                loginButton,

                false,

                "ENTER LIVESIM"

            );

        }

    }

);


// ==========================================
// SESSION MANAGEMENT
// ==========================================


async function updateSession(session) {

    if (!session) {

        sessionPanel.hidden = true;

        loginForm.hidden = false;

        registerForm.hidden = true;

        return;

    }


    const username =

    session.user.user_metadata.username

    || "Player";


    sessionUsername.textContent =

        username;


    sessionPanel.hidden = false;


    loginForm.hidden = true;

    registerForm.hidden = true;


    loginTab.hidden = true;

    registerTab.hidden = true;


    formTitle.textContent =

        "Identity Connected";


    formDescription.textContent =

        "Your session is active.";

}


// ==========================================
// INITIAL SESSION
// ==========================================


async function initializeSession() {

    const {

        data,

        error

    } = await supabase.auth.getSession();


    if (error) {

        console.error(error.message);

        return;

    }


    if (data.session) {

        await updateSession(data.session);

    }

}


// ==========================================
// AUTH STATE LISTENER
// ==========================================


supabase.auth.onAuthStateChange(

    async (event, session) => {

        if (event === "SIGNED_OUT") {

            location.reload();

            return;

        }


        if (session) {

            await updateSession(session);

        }

    }

);


// ==========================================
// LOGOUT
// ==========================================


logoutButton.addEventListener(

    "click",

    async () => {

        logoutButton.disabled = true;


        try {

            const {

                error

            } = await supabase.auth.signOut();


            if (error) {

                throw error;

            }


            location.reload();

        }

        catch (error) {

            console.error(error.message);


            showMessage(

                "Logout failed.",

                "error"

            );

            logoutButton.disabled = false;

        }

    }

);


// ==========================================
// THEME
// ==========================================


function setTheme(theme) {

    document.body.classList.toggle(

        "light",

        theme === "light"

    );


    localStorage.setItem(

        "livesim_theme",

        theme

    );

}


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
// INITIALIZE
// ==========================================


async function initializeLiveSim() {

    console.log(

        "LiveSim Authentication Engine"

    );


    console.log(

        "Version:",

        LiveSimConfig.version

    );


    await initializeSession();


    console.log(

        "Authentication initialized."

    );

}


initializeLiveSim();
