const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("Hello world");
});

require('./src/routes')(app)

app.use((req, res) => {
    return res.status(404).send("Not found");
});

app.listen(8080, "localhost", async (err) => {
    if (err) {
        console.log("Error in server setup");
    } else {
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
    }
});
