const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function TextSheet() {
  const API_KEY = "AIzaSyDwAsEeHiISLQF-UGcabPHeuHx5LKtwtd0";
  const spreadSheetId = "19wXvxzqKMJgHZYhRAl86wFeEn9ZGhIdJnwSHJ9QhADQ";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/MAIN?key=${API_KEY}`;
  try {
    const doc = await axios.get(url);
    const koSheet = {};
    const enSheet = {};
    const jpSheet = {};
    const cnSheet = {};

    // 2. 값 추출
    for (let j = 1; j < doc.data.values.length; j++) {
      const [key, ko, en, jp, cn] = doc.data.values[j];
      koSheet[key] = ko ?? "";
      enSheet[key] = en ?? "";
      jpSheet[key] = jp ?? "";
      cnSheet[key] = cn ?? "";
    }
    const outputPathKo = path.join(__dirname, "messages", "ko.json");
    fs.writeFileSync(outputPathKo, JSON.stringify(koSheet, null, 2), "utf-8");

    const outputPathEn = path.join(__dirname, "messages", "en.json");
    fs.writeFileSync(outputPathEn, JSON.stringify(enSheet, null, 2), "utf-8");

    const outputPathJp = path.join(__dirname, "messages", "jp.json");
    fs.writeFileSync(outputPathJp, JSON.stringify(jpSheet, null, 2), "utf-8");

    const outputPathCn = path.join(__dirname, "messages", "cn.json");
    fs.writeFileSync(outputPathCn, JSON.stringify(cnSheet, null, 2), "utf-8");
  } catch (e) {
    console.log(e);
  }
}

TextSheet();
