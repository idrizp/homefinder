// This exists because Next.js's server sucks.
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { ChatGPTAPI, ChatGPTAPIBrowser } from "chatgpt";

const app = express();
const chatgpt = new ChatGPTAPIBrowser({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
  isGoogleLogin: true,
});

await chatgpt.initSession();

app.use(cors());
app.use(helmet());
app.listen(3001, () => console.log("Listening on port 3000"));

app.get("/:query", async (req, res) => {
  let { query } = req.params;
  query = decodeURIComponent(query);
  query = query.slice(0, 180) + ".";
  let sent = false;
  let timeout = false;
  setTimeout(() => {
    if (!sent) {
      res.status(500).json({ error: "Timed out." });
      timeout = true;
    }
  }, 10_000);
  try {
    const response = await chatgpt.sendMessage(
      `Extract one keyword related to house size; one showing the number of rooms as an integer; one for the precise location; one for the price as an integer; one for the currency of the price as its currency code, all separated by a semicolon from the following message: ${query}`
    );
    if (timeout) {
      return;
    }
    console.log(response);
    // get the text response
    const text = response.response;
    const result = text?.split(";");
    if (result.length < 6 || result.length > 6) {
      res.status(200).json({
        houseSize: "N/A",
        location: "N/A",
        price: -1,
        priceCurrency: "USD",
      });
      return;
    }

    sent = true;
    const outputLines = result?.map((line) =>
      line.split(":")[1].replace(" ", "")
    );
    const price = parseInt(outputLines?.[3] || "0");
    const priceCurrency = outputLines?.[4];

    console.log(outputLines);

    await chatgpt.refreshSession();

    res.status(200).json({
      houseSize: outputLines?.[0] || "N/A",
      roomNumber: parseInt(outputLines?.[1] || "0"),
      location: outputLines?.[2] || "N/A",
      price: price,
      priceCurrency: priceCurrency || "USD",
    });
  } catch (e) {
    res.status(500).json({
      error: "The server failed to process your request.",
    });
  }
});
