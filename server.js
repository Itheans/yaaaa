import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/risk-assessment", async (req, res) => {
  try {
    const { fullName, score, riskLabel, answers, portfolio, funds, thaiStocks, drStocks } = req.body;

    const saved = await prisma.riskAssessment.create({
      data: {
        fullName,
        score,
        riskLabel,

        q1: answers.q1,
        q2: answers.q2,
        q3: answers.q3,
        q4: answers.q4,
        q5: answers.q5,
        q6: answers.q6,
        q7: answers.q7,
        q8: answers.q8,

        portfolio,
        recommendedFunds: funds,
        recommendedThaiStocks: thaiStocks,
        recommendedDR: drStocks,
      },
    });

    res.json({ ok: true, id: saved.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

app.listen(3000, () => console.log("API running: http://localhost:3000"));