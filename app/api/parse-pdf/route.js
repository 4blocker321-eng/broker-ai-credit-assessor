import { NextResponse } from "next/server";
import pdf from "pdf-parse/lib/pdf-parse.js";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const data = await pdf(buffer);

    const text = data.text || "";

    function moneyMatch(label) {
      const regex = new RegExp(
        `${label}[^$-]*(-?\\$?[0-9,]+\\.\\d{2})`,
        "i"
      );

      const match = text.match(regex);

      return match ? match[1] : "Not found";
    }

    function valueMatch(label) {
      const regex = new RegExp(
        `${label}[^0-9]*(\\d+)`,
        "i"
      );

      const match = text.match(regex);

      return match ? match[1] : "0";
    }

    const summary = {
      totalCredits: moneyMatch("Total Credits"),
      totalDebits: moneyMatch("Total Debits"),
      currentBalance: moneyMatch("Current Balance"),
      dishonours: valueMatch("Number of Dishonours"),
      gambling: moneyMatch(
        "Gambling Expenditure - Monthly"
      ),
      groceries: moneyMatch(
        "Groceries - Monthly"
      ),
      rent: moneyMatch("Rent - Monthly"),
    };

    return NextResponse.json({
      success: true,
      text,
      summary,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Failed to parse PDF",
      },
      {
        status: 500,
      }
    );
  }
}