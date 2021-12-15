const express = require('express');
const { Timer } = require("easytimer.js");
const data = require("./response.json");


var timer = new Timer();
const app = express();
const PORT = 8080;

const start = () => timer.start();
const stop = () => timer.stop()
const reset = () => timer.reset()
const pause = () => timer.pause()


app.use(express.json())


app.get('/', (req, res) => {
    const hrs = timer.getTimeValues().hours.toString();
    const mins = timer.getTimeValues().minutes.toString();
    const sec = timer.getTimeValues().seconds.toString();
    
    res.send(`${hrs}:${mins}:${sec}`)
})

app.get('/start', (req, res) => {
    start()
    res.send("timer started...")
})

app.get('/stop', (req, res) => {
    pause()

    res.send("timer stopped...")
})

app.post('/titan', (req, res) => {
    const { name, msg } = req.body;


    const Match = data.filter((item) => item.text === msg.toLowerCase())

    if (!Match.length) {
        return res.send("Command unrecognized !")
    }

    res.send(`${name} ${Match[0].ans}`)
})


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})