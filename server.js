// server.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve your index.html

// POST route for contact form
app.post("/api/contact", async (req, res) => {
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const webhookURL = process.env.DISCORD_WEBHOOK;

    const embed = {
        embeds: [
            {
                title: "📩 New Contact Form Submission",
                color: 3447003, // Blue
                fields: [
                    { name: "👤 Name", value: name, inline: true },
                    { name: "💬 Message", value: message, inline: false }
                ],
                footer: {
                    text: `Sent on ${new Date().toLocaleString()}`
                }
            }
        ]
    };

    try {
        await axios.post(webhookURL, embed);
        res.status(200).json({ success: "Message sent to Discord!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send message to Discord" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

