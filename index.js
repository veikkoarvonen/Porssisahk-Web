
setTopDecoration();
addHourDigits();
addPriceContainer();

function setTopDecoration() {

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
}

function addHourDigits() {
    const container = document.querySelector(".hour-sheet-bottom-right");

    for (let i = 0; i < 24; i++) {
        const p = document.createElement("p");
        p.textContent = i;
        p.classList.add("hour-digit")

        container.appendChild(p);
    }
}

function addPriceContainer() {
    const parentContainer = document.querySelector(".hour-sheet-top-right");
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container")
    parentContainer.appendChild(priceContainer);

    const positivePriceBox = document.createElement("div")
    const negativePriceBox = document.createElement("div")
    positivePriceBox.classList.add("positive-price-box")
    negativePriceBox.classList.add("negative-price-box")
    priceContainer.appendChild(positivePriceBox)
    priceContainer.appendChild(negativePriceBox)


    for (let i = 0; i < 24; i++) {
        // Create price column for the positive price box
        const positivePriceColumn = document.createElement("div");
        positivePriceColumn.classList.add("positive-price-column");
        positivePriceBox.appendChild(positivePriceColumn);

        // Create price column for the negative price box
        const negativePriceColumn = document.createElement("div");
        negativePriceColumn.classList.add("negative-price-column");
        negativePriceBox.appendChild(negativePriceColumn);
    }

}

    

