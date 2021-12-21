document.getElementsByTagName("footer")[0].innerHTML = `
    <p id="copyright" tabindex="0">
        developed by <a id="author" href="#">gabit</a> <span id="year"></span>
    </p>`
let currentYear = (new Date().getFullYear());
document.getElementById("year").innerText = currentYear;