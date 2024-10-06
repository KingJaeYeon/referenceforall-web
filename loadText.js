import fs from "fs";
import path from "path";
import axios from "axios";

async function TextSheet() {
  const API_KEY = "AIzaSyDwAsEeHiISLQF-UGcabPHeuHx5LKtwtd0";
  const spreadSheetId = "19wXvxzqKMJgHZYhRAl86wFeEn9ZGhIdJnwSHJ9QhADQ";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/MAIN?key=${API_KEY}`;
  try {
    const doc = await axios.get(url);
    const koSheet = {};
    const enSheet = {};
    // 1. 언어 추출
    const language = doc.data.values[0].slice(1);

    // 2. 값 추출
    for (let j = 0; j < doc.data.values.length; j++) {
      const row = doc.data.values[j];
      const key = row[0];
      koSheet[key] = row[1] ?? "";
      enSheet[key] = row[2] ?? "";
    }
    console.log(koSheet);
    console.log(enSheet);
  } catch (e) {
    console.log(e);
  }

  // const rows = await sheetData.getRows();

  // for (let j = 0; j < rows.length; j++) {
  //   const row = rows[j];
  //
  //   const key = row._rawData[0];
  //   koSheet[key] = row._rawData[1] ?? "";
  //   enSheet[key] = row._rawData[2] ?? "";
  // }
  //
  // const outputPathKo = path.join(__dirname, "public/lang", "ko.json");
  // fs.writeFileSync(outputPathKo, JSON.stringify(koSheet, null, 2), "utf-8");
  //
  // const outputPathEn = path.join(__dirname, "public/lang", "en.json");
  // fs.writeFileSync(outputPathEn, JSON.stringify(enSheet, null, 2), "utf-8");
}

TextSheet();
