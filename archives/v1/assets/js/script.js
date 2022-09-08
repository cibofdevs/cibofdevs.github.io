console.log("Hello 🌎! I'm, Ahmad.");

function toggleDarkLight() {
    var body = document.getElementById("body");
    var currentClass = body.className;
    body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    var span = document.getElementById("switchtext");
    span.className = currentClass == "dark-mode" ? "fas fa-moon fa-2x" : "fas fa-sun fa-2x";
}