const currentDate = new Date();
var extractedPrices = []
var hasNegativePrices = false

fetchElectricityPrice(currentDate);

//FETCH & PARSE JSON RESULTS

function fetchElectricityPrice(date) {

    extractedPrices = []

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

        extractedPrices.push(priceStructure)
  }

  handleUIupdates();

}

//HANDLE UI CHANGES WITH RESULTS

function handleUIupdates() {
    console.log("UI uådates...")
}