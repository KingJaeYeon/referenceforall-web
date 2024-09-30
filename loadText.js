import fs from "fs";
import path from "path";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const googleAuthSheet = require("./pickle-sheet-178c06c0add5.json"); // 인증 정보 변경 필요

async function TextSheet() {
  const url = "";

  const googleAuth = new JWT({
    email: googleAuthSheet.client_email,
    key: googleAuthSheet.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(url, googleAuth);

  await doc.loadInfo();

  const sheetData = doc.sheetsByTitle["sheet"];

  const koSheet = {};
  const enSheet = {};

  const rows = await sheetData.getRows();

  for (let j = 0; j < rows.length; j++) {
    const row = rows[j];

    const key = row._rawData[0];
    koSheet[key] = row._rawData[1] ?? "";
    enSheet[key] = row._rawData[2] ?? "";
  }

  const outputPathKo = path.join(__dirname, "public/lang", "ko.json");
  fs.writeFileSync(outputPathKo, JSON.stringify(koSheet, null, 2), "utf-8");

  const outputPathEn = path.join(__dirname, "public/lang", "en.json");
  fs.writeFileSync(outputPathEn, JSON.stringify(enSheet, null, 2), "utf-8");
}

TextSheet();
