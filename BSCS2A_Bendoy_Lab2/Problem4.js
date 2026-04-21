let hasSession = true;
let isAdmin = false;
let isEmployee = false;
let isManager = true;
let accessGranted = hasSession && isAdmin; // change from & to && so it uses logical AND
let badgeGranted;
if (isEmployee === true || isManager === true) { // change from = to === so it would compare correctly
    badgeGranted = true;
} else {
badgeGranted = false;
}
console.log("Access Granted: " + accessGranted + " | Badge Granted: " + badgeGranted);