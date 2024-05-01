
var windowHeight = window.innerHeight
var currentHeight = window.scrollY
var pageHeight = document.body.scrollHeight

window.addEventListener('scroll', function() {
    console.clear()
    console.log(windowHeight)
    console.log(currentHeight)
    console.log(pageHeight)
    if ((currentHeight+windowHeight) >= pageHeight) {
        console.log("Reached bottom")
    }
});