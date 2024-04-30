window.addEventListener('scroll', function() {
    var windowHeight = window.innerHeight
    var currentHeight = window.scrollY
    var pageHeight = document.body.scrollHeight
    if ((currentHeight+windowHeight) >= pageHeight) {
        console.log("Reached bottom")
    }
});