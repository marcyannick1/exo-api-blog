const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/users");
dotenv.config();

const app = express();

// encodade de l'url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).send("Hello world");
});

app.post("/register", async (req, res) => {
    try {
        const { nom, prenom, email, pseudo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ nom, prenom, email, pseudo, password: hashedPassword });
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }

        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "24h" });

        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

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
