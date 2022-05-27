require('dotenv').config()
const express = require('express')
const Twit = require('twit')
const needle = require('needle')
const app = express()
const port = process.env.PORT


const time = 1000 * 60 * 2  // time in millisecond e.g. 2 min will be 1000*60*2

const jokeUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist&type=single'

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
})

const joke = async () => {
    try {
        //get joke from joke API
        const response = await needle('get', jokeUrl)
        console.log(`joke: ${response.body.joke}`)
        

        const tweet = {
            status: `${response.body.joke}`
        }

        // tweet the joke
        const postTweet = await T.post('statuses/update', tweet)
        console.log('tweeted...')
        

    } catch (error) {
        console.log('caught error :', error)
    }
}

console.log(`running...every ${time / (60 * 1000)} minute`)

// setting time 
app.get('/', (req, res) => {
    res.send('working...')
    setInterval(joke, time);
    
})


// const timeZone = {
//     scheduled: true,
//     timezone: "Asia/Kolkata"
// }
// Schedule tasks to be run on the server.
// const task = cron.schedule('32 16 * * *', joke, timeZone);
// task.start()

app.listen(port, () => {
    console.log('server running')
})


