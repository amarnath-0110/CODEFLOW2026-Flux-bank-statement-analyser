import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import PDFParser from "pdf2json";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}
const upload = multer({
    dest: "uploads/", limits: {
        fileSize: 10 * 1024 * 1024
    }
});
const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const CATEGORY_RULES = {
    Food: ["zomato", "swiggy", "mcdonalds", "kfc", "starbucks", "grocery", "supermarket"],
    Shopping: ["amazon", "flipkart", "myntra", "zara", "reliance", "mall"],
    Rent: ["rent", "landlord", "housing", "estate"],
    Travel: ["uber", "ola", "irctc", "indigo", "petrol", "fuel", "metro"],
    Salary: ["salary", "payroll", "wages", "credited"],
    "UPI Transfers": ["upi", "phonepe", "gpay", "paytm", "bharatpe"],
    Subscriptions: ["netflix", "spotify", "prime", "hotstar", "youtube"],
    EMIs: ["emi", "loan", "bajaj", "credit card"],
    Utilities: ["electricity", "water", "internet", "wifi", "jio", "airtel"]
};

const categorizeTransactions = (transactions) => {
    return transactions.map((tx) => {
        const text = (tx.narration || "").toLowerCase();
        let category = "Other";

        for (const [cat, keys] of Object.entries(CATEGORY_RULES)) {
            if (keys.some((k) => text.includes(k))) {
                category = cat;
                break;
            }
        }

        return { ...tx, category };
    });
};

const calculateInsights = (transactions) => {
    let income = 0;
    let expense = 0;
    const breakdown = {};
    const freq = {};

    transactions.forEach((tx) => {
        const c = parseFloat(tx.credit) || 0;
        const d = parseFloat(tx.debit) || 0;

        income += c;
        expense += d;

        if (d > 0) {
            breakdown[tx.category] = (breakdown[tx.category] || 0) + d;

            if (tx.category !== "Other") {
                const key = `${tx.category}_${d}`;
                freq[key] = (freq[key] || 0) + 1;
            }
        }
    });

    let topCat = "None";
    let max = 0;

    for (const [k, v] of Object.entries(breakdown)) {
        if (v > max) {
            max = v;
            topCat = k;
        }
    }

    const recurring = Object.entries(freq)
        .filter(([_, v]) => v > 1)
        .map(([k, v]) => {
            const [cat, amt] = k.split("_");
            return { category: cat, amount: parseFloat(amt), frequency: v };
        });

    const avg = expense / (transactions.filter((t) => t.debit > 0).length || 1);
    const unusual = transactions.filter((t) => t.debit > avg * 2);

    return {
        total_income: income.toFixed(2),
        total_expenses: expense.toFixed(2),
        net_savings: (income - expense).toFixed(2),
        category_breakdown: breakdown,
        highest_spending_category: topCat,
        recurring_payments: recurring,
        unusual_transactions: unusual.slice(0, 5),
        financial_health: income > expense ? "Good" : "Needs Attention"
    };
};

const generateAISummary = async (insights) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `You are a financial advisor.

                            Analyze this financial data:

                            Income: ₹${insights.total_income}
                            Expenses: ₹${insights.total_expenses}
                            Net Savings: ₹${insights.net_savings}
                            Highest Spending Category: ${insights.highest_spending_category}

                            Category Breakdown:
                            ${JSON.stringify(insights.category_breakdown)}

                            Generate a SHORT and PRECISE financial summary in this format:

                            Overview:
                            (Only 1-2 short sentences)

                            Suggestions:
                            • Suggestion 1
                            • Suggestion 2
                            • Suggestion 3

                            Keep the response concise, professional, and dashboard-friendly.
                            Avoid long paragraphs and unnecessary explanations.`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (err) {
        console.error(err);
        return "AI Summary unavailable.";
    }
};

const parseCSV = (filePath) => {
    const data = fs.readFileSync(filePath, "utf-8").split("\n");
    const headers = data[0].toLowerCase().split(",");
    const txns = [];

    for (let i = 1; i < data.length; i++) {
        if (!data[i].trim()) continue;

        const values = data[i].split(",");
        const row = {};

        headers.forEach((h, idx) => {
            row[h.trim()] = values[idx] ? values[idx].trim() : "";
        });

        txns.push({
            date: row.date || "",
            narration: row.narration || row.description || row.particulars || "",
            debit: parseFloat(row.debit || row.withdrawal || 0),
            credit: parseFloat(row.credit || row.deposit || 0),
            balance: parseFloat(row.balance || 0)
        });
    }

    return txns;
};

const parsePDF = (filePath) => {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser(this, 1);

        pdfParser.on("pdfParser_dataError", (e) => reject(e.parserError));

        pdfParser.on("pdfParser_dataReady", () => {
            const text = pdfParser.getRawTextContent();
            const lines = text.split(/\r?\n/);
            const txns = [];

            const regex = /^\s*(\d+)\s+(\d{2}\s+[a-zA-Z]{3}\s+\d{4})(.*)/;

            lines.forEach((line) => {
                const m = line.match(regex);
                if (!m) return;

                const date = m[2];
                const rest = m[3];

                const parts = rest.trim().split(/\s{2,}|\t/);

                if (parts.length < 3) return;

                const balanceStr = parts.at(-1);
                const amountStr = parts.at(-2);

                const amount = parseFloat(amountStr.replace(/[^0-9.-]+/g, "")) || 0;
                const balance = parseFloat(balanceStr.replace(/[^0-9.-]+/g, "")) || 0;

                const amtIdx = line.lastIndexOf(amountStr);
                const balIdx = line.lastIndexOf(balanceStr);
                const gap = balIdx - (amtIdx + amountStr.length);

                let debit = 0;
                let credit = 0;

                if (gap > 15) debit = amount;
                else credit = amount;

                const narration = parts.slice(0, -2).join(" ");

                txns.push({
                    date,
                    narration,
                    debit,
                    credit,
                    balance
                });
            });

            resolve(txns);
        });

        pdfParser.loadPDF(filePath);
    });
};

app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.get("/faqs", (req, res) => {
    res.render("faq.ejs");
});
app.post("/upload", upload.single("files"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const path = req.file.path;
        const name = req.file.originalname.toLowerCase();

        let txns = [];

        if (name.endsWith(".csv")) txns = parseCSV(path);
        else if (name.endsWith(".pdf")) txns = await parsePDF(path);
        else {
            fs.unlinkSync(path);
            return res.status(400).json({ error: "Unsupported file type" });
        }

        fs.unlinkSync(path);

        const categorized = categorizeTransactions(txns);
        const insights = calculateInsights(categorized);
        const ai = await generateAISummary(insights);

        res.render("report.ejs", {

            categorization: categorized,

            income_vs_expense: {
                total_income: insights.total_income,
                total_expense: insights.total_expenses
            },

            category_breakdown: insights.category_breakdown,

            recurring_payments: insights.recurring_payments,

            financial_health: insights.financial_health,

            ai_summary: ai,

            unusual_transactions: insights.unusual_transactions

        });
    } catch (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).send("File size exceeds 10MB limit.");
        }
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
