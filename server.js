const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./src/models/users");
const Articles = require("./src/models/articles");
const authMiddleware = require("./src/controller/auth")
const { checkPassword, hashPassword } = require("./src/utils/bcrypt");
const { jwtSign } = require("./src/utils/jwt");
const jwt = require('jsonwebtoken')
dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile('src/views/index.html', {root: __dirname })
});

app.post("/login", async (req, res) => {
    if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !checkPassword(password, user.password)) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }

        const token = await jwtSign({id: user.id});
        await User.update({token}, {where: {id: user.id}})

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

app.post('/user', async (req, res) => {
    const { nom, prenom, email, pseudo, password } = req.body;
    const hashedPassword = hashPassword(password);
    try {
        const user = await User.create({ nom, prenom, email, pseudo, password: hashedPassword });

        if (!user.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.post('/create-article', authMiddleware, async (req, res) =>{
    const { nom, contenu, createdAt, userId } = req.body;

    try {
        const article = await Articles.create({nom, contenu, createdAt, userId})
        if (!article.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', article: article})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.get('/articles', authMiddleware, async (req, res) => {
    try {
      const articles = await Articles.findAll({
        where: {
          userId: req.user.id 
        }
      });
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.get('/create-article', (req, res) =>{
    res.sendFile('src/views/create-article.html', {root: __dirname })
});

app.get('/login', (req, res) =>{
    res.sendFile('src/views/login.html', {root: __dirname })
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
