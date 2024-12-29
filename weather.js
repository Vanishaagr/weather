const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());

const API_KEY = 'f1e037f26c20ff1fa6c4d42b3af33fb6';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City name is required');
  }

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    console.log("res",response);
    console.log(response.data.weather);
    const { name, main: { temp } ,weather} = response.data; // Destructure to get the city name and temperature
    const weatherCondition = weather[0].main;
    res.json({ city: name, temperature: temp,Weather: weatherCondition});
  } catch (error) {
    console.error('Error fetching the weather data:', error);
    res.status(500).send('Error fetching the weather data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
