const express = require('express')
const { json } = require('express/lib/response')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const port = process.env.PORT || 3000
const app = express()

app.get("/", (req, res) => {
    return res.send(`
        <h1>Hello!</h1>
        <a href="/auth">github</a>
        `)
});

app.get("/auth", (req, res) => {
    app.redirect(`https://github.com/login/oauth/authorize?scope=read:user&client_id=${process.env.CLIENT_ID}`)
});

app.get("github-callback", async (req,res) =>{
    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code
    }

    try {
        const response = await fetch ("https://github.com/login/oauth/acess_token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const gho_data = await response.json();
        console.log(gho_data)
        
    } catch (err) {
        console.log(err),
        res.status(500).send("ehhh gl hf i guess??");
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});