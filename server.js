const express = require("express")
const request = require("request-promise")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000;

const apiKey = process.env.API_KEY;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to scrapper API")
})

// Get products details
app.get("/products/:productId", async (req, res) => {
  const {productId} = req.params
  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`)
    res.json(JSON.parse(response));
  } catch(error) {
    console.log(error);
    res.json(error);
  }
})

// Get products details
app.get("/products/:productId/reviews", async (req, res) => {
  const {productId} = req.params
  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`)
    res.json(JSON.parse(response));
  } catch(error) {
    console.log(error);
    res.json(error);
  }
})

// Get products offers
app.get("/products/:productId/offers", async (req, res) => {
  const {productId} = req.params
  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`)
    res.json(JSON.parse(response));
  } catch(error) {
    console.log(error);
    res.json(error);
  }
})

// Get search results
app.get("/search/:searchQuery", async (req, res) => {
  const {searchQuery} = req.params
  try {
    const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`)
    res.json(JSON.parse(response));
  } catch(error) {
    console.log("THIS IS THE ERROR", error);
    res.json(error);
  }
})

app.listen(PORT, () => console.log(`Server running on PORT = ${PORT}`))