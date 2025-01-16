var fetchedPrices = []
const currentDate = new Date();
fetchElectricityPrice(currentDate)



/* SUCCESSFULL PRICE FETCH */
function didSuccessWithPriceFetch() {
    const hasNegativePrices = fetchedPrices.some(item => item.price < 0);
    console.log("There is negative prices: " + hasNegativePrices)

    if (hasNegativePrices) {
        adjustPriceContainers();
        const lines = document.querySelectorAll(".line")
        lines[4].classList.add("line-zero")
    } else {
        
    }

    adjustSheetDigits(hasNegativePrices);

}

//Change grid layout if there are negative prices
function adjustPriceContainers() {
    const priceContainer = document.querySelector(".price-container")
    priceContainer.style.gridTemplateRows = "4fr 1fr";
}

//Adjust sheet digits to match price range
function adjustSheetDigits(hasNegativePrices) {
    const highestPrice = Math.max(...fetchedPrices.map(item => item.price));
    console.log("Highest price in array " + highestPrice)

    const intervalForDigits = hasNegativePrices ? 4 : 5
    var highestPriceForSheet = 0

    while (highestPriceForSheet < highestPrice) {
        highestPriceForSheet += intervalForDigits
    }

    console.log("Highest price in sheet: " + highestPriceForSheet)

    const oneDigitGap = highestPriceForSheet / intervalForDigits
    const priceDigits = document.querySelectorAll(".hour-sheet-top-left .price-digit");
    var priceToInsertInSheet = highestPriceForSheet

    priceDigits.forEach((element, index) => {
        element.textContent = priceToInsertInSheet.toFixed(0)
        priceToInsertInSheet -= oneDigitGap
    });

    displaySheetColumns(highestPriceForSheet, oneDigitGap)

}

function displaySheetColumns(maxPrice, minPrice) {
    const positivePriceColumns = document.querySelectorAll(".positive-price-column")
    const negativePriceColumns = document.querySelectorAll(".negative-price-column")
    const priceBox = document.querySelector(".single-price-box")
    const timeText = document.getElementById("time-text")
    const priceText = document.getElementById("price-text")

    for (let i = 0; i < 24; i++) {
        const priceObject = fetchedPrices.find(item => item.hour === i);

        if (priceObject.price) {
            if (priceObject.price < 0) {
                const priceColumn = negativePriceColumns[i];
                const height = Math.abs(priceObject.price / minPrice) * 100; 
                setTimeout(() => {
                    priceColumn.style.height = `${height}%`; // Animate to the desired height
                }, 0);
                priceColumn.addEventListener("mousemove", (event) => {
                    priceBox.style.opacity = "1";
                    priceBox.style.left = `${event.pageX - 50}px`; 
                    priceBox.style.top = `${event.pageY - 50}px`;
                    timeText.innerHTML = "Klo: " + priceObject.hour
                    priceText.innerHTML = priceObject.price + "c / kWh"
                })
                priceColumn.addEventListener("mouseleave", () => {
                    // Hide the price box when the mouse leaves
                    priceBox.style.opacity = "0";
                });
            } else {
                const priceColumn = positivePriceColumns[i];
                const height = (priceObject.price / maxPrice) * 100; 
                setTimeout(() => {
                    priceColumn.style.height = `${height}%`; // Animate to the desired height
                }, 0);
                priceColumn.addEventListener("mousemove", (event) => {
                    priceBox.style.opacity = "1";
                    priceBox.style.left = `${event.pageX - 50}px`; 
                    priceBox.style.top = `${event.pageY - 50}px`; 
                    timeText.innerHTML = "Klo: " + priceObject.hour
                    priceText.innerHTML = priceObject.price + "c / kWh"
                });
                priceColumn.addEventListener("mouseleave", () => {
                    // Hide the price box when the mouse leaves
                    priceBox.style.opacity = "0";
                });
            }
        } else {
            console.log("Failed to find price for hour :" + i)
        }
    }

}


/* FETCH JSON DATA ONLINE */
function fetchElectricityPrice(date) {

    fetchedPrices = []

    const baseURL = "https://www.sahkonhintatanaan.fi/api/v1/prices/";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    const dateString = `${year}/${month}-${day}`
    const apiURL = `${baseURL}${dateString}.json`;

    fetchJSONresult(apiURL)

}

async function fetchJSONresult(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        extractPricesFromJSON(data)

    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

function extractPricesFromJSON(JSONData) {

    for (let i = 0; i < JSONData.length; i++) {
        const hour = new Date(JSONData[i].time_start).getHours();
        const price = JSONData[i].EUR_per_kWh * 100 * 1.255

        const roundedPrice = parseFloat(price.toFixed(2));

        const priceStructure = {
            price: roundedPrice,
            hour: hour
        }

        fetchedPrices.push(priceStructure)
  }

    console.log(fetchedPrices)
    didSuccessWithPriceFetch();

}





/* HARD-CODED PRICES FOR TESTING PURPOSES */
function generateTestingPrices() {
    var priceArray = []

    const hours = Array.from({ length: 24 }, (_, i) => i); // [0, 1, 2, ..., 23]

    const testingPrices = [
        10.25, 9.50, 5.75, 12.30, 8.00, 11.45, -3.60, 6.20, 
        10.50, 1.20, 5.40, 7.80, 14.00, 2.35, 3.25, 3.40, 
        7.50, 4.60, 9.80, 8.10, 19.50, 13.75, 8, 12
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

/*
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
           
        }
    })


}


*/


