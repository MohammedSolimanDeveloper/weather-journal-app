/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b03d9420e2391166aa75aa93a1ba32a9';

// Create a new data instance dynamically with js
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

const userInfo = document.getElementById('userInfo');

//Event Listener To add function to existing HTML DOM element
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();

    //Get user Input
    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    if (zipCode !== '') {
        generateBtn.classList.remove('invalid');
        getWeatherData(baseUrl, zipCode, apiKey)
                .then(function(data) {
                    // Add data to Post Request
                    postData('/add',  { temp: convertKelvinToCelsius(data.main.temp), date: newDate, content: content });
                }).then(function() {
                    //Call UpdateUI To Update browser content
                    updateUI()
                }).catch(function(error) {
                    console.log(error);
                    alert('The zip code is invalid. Try again')
                });

                userInfo.reset();
            }
            else {
                    generateBtn.classList.add('invalid');
                }
    }

    /* Function to GET Web API Data */
    const getWeatherData = async(baseUrl, zipCode, apiKey) => {
        // res equals to the result of fetch function
        const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
        try {
            // data equals to the result of fetch  function
            const data = await res.json();
            return data;
        } catch (error) {
            console.log('error', error);
        }
    };

    /* Function To POST Data */
    const postData = async(url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temp: data.temp,
                date: data.date,
                content: data.content
            })
        });

        try {
            const newData = await response.json();
            return newData;
        } catch (error) {
            console.log(error);
        }
    };

    const updateUI = async() => {
        const request = await fetch('/all');
        try {
            const allData = await request.json();
            console.log(allData);
            // Update new entry Values
            if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
                document.getElementById('date').innerHTML = allData.date;
                document.getElementById('temp').innerHTML = allData.temp+ ' degree C';
                document.getElementById('content').innerHTML = allData.content;
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    // Helper function to convert temperature from kelvin to celsius
    function convertKelvinToCelsius(kelvin) {
        if (kelvin < (0)) {
            return 'below absolute zero (0 K)';
        } else {
            return (kelvin - 273.15).toFixed(2);
        }
    }
    