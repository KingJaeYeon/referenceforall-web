const fs = require("fs");
const path = require("path");
const axios = require("axios");

async function TextSheet() {
  const API_KEY = "AIzaSyDwAsEeHiISLQF-UGcabPHeuHx5LKtwtd0";
  const spreadSheetId = "19wXvxzqKMJgHZYhRAl86wFeEn9ZGhIdJnwSHJ9QhADQ";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/MAIN?key=${API_KEY}`;
  try {
    const doc = await axios.get(url);
    const headers = doc.data.values[0]; // 첫 번째 행을 헤더로 사용
    const languages = headers.slice(1); // 첫 번째 열(이름)을 제외한 언어 리스트

    const sheets = languages.reduce((acc, lang) => {
      acc[lang] = {};
      return acc;
    }, {});


    for (let i = 1; i < doc.data.values.length; i++) {
      const row = doc.data.values[i];
      const keyPath = row[0].split("."); // 점(.) 기준으로 키 분할

      languages.forEach((lang, index) => {
        setNestedObject(sheets[lang], keyPath, row[index + 1] || "");
      });
    }

    // JSON 파일로 저장
    Object.entries(sheets).forEach(([lang, data]) => {
      const outputPath = path.join(__dirname, "src/app/i18n/locales", `${lang}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), "utf-8");
    });

    console.log("JSON 파일이 성공적으로 생성되었습니다.");
  } catch (e) {
    console.error("데이터 가져오기 실패:", e);
  }
}


function setNestedObject(obj, keys, value) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

TextSheet();
