var fetchedPrices = generateTestingPrices();
var hasNegativePrices = false
var highestPriceForSheet = 0

runNegativePriceCheck();
createSheetRange();
displayPrices();

function runNegativePriceCheck() {
    for (let i = 0; i < fetchedPrices.length; i++) {
        if (fetchedPrices[i].price < 0) {
            hasNegativePrices = true
            break
        }
    }
    console.log("has negative prices: " + hasNegativePrices)
}

function createSheetRange() {
    const priceDigits = document.querySelectorAll(".hour-sheet-top-left .price-digit");
    const highestPrice = Math.max(...fetchedPrices.map(item => item.price));

    console.log("Highest Price:", highestPrice);

    
    var interval = hasNegativePrices ? 4 : 5;

    while (highestPriceForSheet < highestPrice) {
        highestPriceForSheet += interval
    }

    const priceGap = highestPriceForSheet / interval
    var priceToAdd = highestPriceForSheet

    priceDigits.forEach((element, index) => {
        element.textContent = priceToAdd.toFixed(0)
        priceToAdd -= priceGap
    });
}

function displayPrices() {
    const priceColums = document.querySelectorAll(".price-column")
    
    priceColums.forEach((element, index) => {
        const priceObject = fetchedPrices.find(item => item.hour === index);
        console.log(priceObject)

        if (priceObject) {
            var height = priceObject.price / highestPriceForSheet * 100
            height = height.toFixed(0);

            element.style.height = `${height}%`;
        }
    })


}





function generateTestingPrices() {
    var priceArray = []

    const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]

    const testingPrices = [
        10.25, 9.50, 5.75, 12.30, 8.00, 11.45, 3.60, 6.20, 
        10.50, 1.20, 5.40, 7.80, 14.00, 2.35, 3.25, 11.00, 
        7.50, 4.60, 9.80, 8.10, 19.50, 13.75, 2.10, 8
    ];

    for (let i = 0; i < 24; i++) {
        const priceStructure = {
            price: testingPrices[i],
            hour: hours[i]
        }

        priceArray.push(priceStructure)
    }


    return priceArray
}