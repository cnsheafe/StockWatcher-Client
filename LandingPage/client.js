const chartContext = document.getElementById("graph");

const data = [{"timeStamp":"2017-09-26","price":73.67},{"timeStamp":"2017-09-25","price":74.09},{"timeStamp":"2017-09-22","price":73.99},{"timeStamp":"2017-09-21","price":75.11},{"timeStamp":"2017-09-20","price":75.35},{"timeStamp":"2017-09-19","price":75.21},{"timeStamp":"2017-09-18","price":75.23},{"timeStamp":"2017-09-15","price":74.83},{"timeStamp":"2017-09-14","price":75},{"timeStamp":"2017-09-13","price":74.93},{"timeStamp":"2017-09-12","price":74.76},{"timeStamp":"2017-09-11","price":74.31},{"timeStamp":"2017-09-08","price":74.33},{"timeStamp":"2017-09-07","price":73.68},{"timeStamp":"2017-09-06","price":73.74},{"timeStamp":"2017-09-05","price":73.34},{"timeStamp":"2017-09-01","price":74.71},{"timeStamp":"2017-08-31","price":74.03},{"timeStamp":"2017-08-30","price":73.01},{"timeStamp":"2017-08-29","price":72.25},{"timeStamp":"2017-08-28","price":73.06},{"timeStamp":"2017-08-25","price":72.86},{"timeStamp":"2017-08-24","price":72.74},{"timeStamp":"2017-08-23","price":72.96},{"timeStamp":"2017-08-22","price":72.35},{"timeStamp":"2017-08-21","price":72.47},{"timeStamp":"2017-08-18","price":72.27},{"timeStamp":"2017-08-17","price":73.58},{"timeStamp":"2017-08-16","price":73.34},{"timeStamp":"2017-08-15","price":73.59},{"timeStamp":"2017-08-14","price":73.06},{"timeStamp":"2017-08-11","price":71.61},{"timeStamp":"2017-08-10","price":71.9},{"timeStamp":"2017-08-09","price":72.25},{"timeStamp":"2017-08-08","price":72.09},{"timeStamp":"2017-08-07","price":72.8},{"timeStamp":"2017-08-04","price":72.4},{"timeStamp":"2017-08-03","price":72.19},{"timeStamp":"2017-08-02","price":72.55},{"timeStamp":"2017-08-01","price":73.1},{"timeStamp":"2017-07-31","price":73.3},{"timeStamp":"2017-07-28","price":72.67},{"timeStamp":"2017-07-27","price":73.76},{"timeStamp":"2017-07-26","price":74.34},{"timeStamp":"2017-07-25","price":73.8},{"timeStamp":"2017-07-24","price":73.53},{"timeStamp":"2017-07-21","price":73.45},{"timeStamp":"2017-07-20","price":74.18},{"timeStamp":"2017-07-19","price":73.5},{"timeStamp":"2017-07-18","price":73.09},{"timeStamp":"2017-07-17","price":72.8},{"timeStamp":"2017-07-14","price":72.24},{"timeStamp":"2017-07-13","price":71.5},{"timeStamp":"2017-07-12","price":70.69},{"timeStamp":"2017-07-11","price":70},{"timeStamp":"2017-07-10","price":69.46},{"timeStamp":"2017-07-07","price":68.7},{"timeStamp":"2017-07-06","price":68.27},{"timeStamp":"2017-07-05","price":68.26},{"timeStamp":"2017-07-03","price":69.33},{"timeStamp":"2017-06-30","price":68.78},{"timeStamp":"2017-06-29","price":69.38},{"timeStamp":"2017-06-28","price":69.21},{"timeStamp":"2017-06-27","price":70.11},{"timeStamp":"2017-06-26","price":71.4},{"timeStamp":"2017-06-23","price":70.09},{"timeStamp":"2017-06-22","price":70.54},{"timeStamp":"2017-06-21","price":70.21},{"timeStamp":"2017-06-20","price":70.82},{"timeStamp":"2017-06-19","price":70.5},{"timeStamp":"2017-06-16","price":69.73},{"timeStamp":"2017-06-15","price":69.27},{"timeStamp":"2017-06-14","price":70.91},{"timeStamp":"2017-06-13","price":70.02},{"timeStamp":"2017-06-12","price":69.25},{"timeStamp":"2017-06-09","price":72.04},{"timeStamp":"2017-06-08","price":72.51},{"timeStamp":"2017-06-07","price":72.64},{"timeStamp":"2017-06-06","price":72.3},{"timeStamp":"2017-06-05","price":71.97},{"timeStamp":"2017-06-02","price":70.44},{"timeStamp":"2017-06-01","price":70.24},{"timeStamp":"2017-05-31","price":70.53},{"timeStamp":"2017-05-30","price":69.79},{"timeStamp":"2017-05-26","price":69.8},{"timeStamp":"2017-05-25","price":68.97},{"timeStamp":"2017-05-24","price":68.87},{"timeStamp":"2017-05-23","price":68.72},{"timeStamp":"2017-05-22","price":67.89},{"timeStamp":"2017-05-19","price":67.5},{"timeStamp":"2017-05-18","price":67.4},{"timeStamp":"2017-05-17","price":68.89},{"timeStamp":"2017-05-16","price":68.23},{"timeStamp":"2017-05-15","price":68.14},{"timeStamp":"2017-05-12","price":68.61},{"timeStamp":"2017-05-11","price":68.36},{"timeStamp":"2017-05-10","price":68.99},{"timeStamp":"2017-05-09","price":68.86},{"timeStamp":"2017-05-08","price":68.97},{"timeStamp":"2017-05-05","price":68.9}];
let prices = new Array(data.length-1);
let timeStamps = new Array(data.length-1);

const N = data.length - 1;
for (let i=N; i >= 0; i--) {
    prices[N-i] = data[i].price;
    timeStamps[N-i] = data[i].timeStamp;
}

const newChart = new Chart(chartContext, {
    type: "line",
    data: {
        labels: timeStamps,
        datasets: [{
            data: prices,
            label: "Stock Price in USD",
            backgroundColor: "#00BCD4",
            borderColor: "#0097A7",
            borderWidth: 5
        }]
    },
    options: {
        display: true,
        title: {
            display: true,
            fontFamily: "'Lato', sans-serif",
            text: "Microsoft"
        },
        maintainAspectRatio: false
    }
});

document.getElementById("try-button").addEventListener("click", event => {
    event.preventDefault();
    location.href = "https://stock-watcher-app.herokuapp.com";
})