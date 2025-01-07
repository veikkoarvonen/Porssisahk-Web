const topBars = document.querySelectorAll(".top-shape")
const shapeHeights = [20, 35, 50]
var currentIndex = 0

for (let i = 0; i<topBars.length; i++) {

    var height = shapeHeights[currentIndex]
    topBars[i].style.height = height + "px";

    if (currentIndex == 2) {
        currentIndex = 0
    } else {
        currentIndex++
    }

}