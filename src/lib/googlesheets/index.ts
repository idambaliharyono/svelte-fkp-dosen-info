import { google } from "googleapis";
import type { App } from "@sveltejs/kit";

interface ParsedData {
  [sheetName: string]: Record<string, any>[];
}

interface RawDataRange {
  range: string;
  values?: any[][];
}
export let isFetching = false;
export async function getCachedData(platform: App.Platform) {
  if (!isFetching) {
    isFetching = true;
    console.log("fetching in progress");
  }
  //   const KV = platform?.env?.SPREADSHEET_DOSEN_FKP;
  //   const CACHE_KEY = "spreadsheet_data";
  //   const CACHE_TTL = 60;

  //   if (KV) {
  //     try {
  //       const cached = await KV.get(CACHE_KEY, { type: "json" });
  //       if (cached) {
  //         console.log("serving from KV");
  //         return cached;
  //       }
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   }

  console.log("fetching from spreadsheet");
  const rawData = await fetchData(platform);
  const parsedData = parseData(rawData);
  //   if (KV) {
  // await KV.put(CACHE_KEY, JSON.stringify(parsedData), {
  //   expirationTtl: CACHE_TTL,
  // });
  //   }
  return parsedData;
}

async function fetchData(platform: App.Platform | undefined) {
  const env = platform?.env;
  try {
    const credentials = JSON.parse(env?.GOOGLE_CREDENTIALS_JSON);
    if (!credentials) {
      throw new Error("invalid credentials");
    }

    const spreadsheetId = "1dDb6GCFN-oiHIpnFNx65STADlRiViXBTl9ZnJxUCziY";
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client as any });
    const ranges = [
      "profil!A1:I100",
      "penelitian!A1:F5000",
      "mengajar!A1:F1000",
      "karya_ilmiah!A1:J1000",
      "pengabdian!A1:H1000",
    ];
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });

    return response.data.valueRanges;
  } catch (error) {
    console.error("fetch failed,", error);
    return [];
  }
}

async function parseData(bulkData: any = ([] = [])): ParsedData {
  const result: ParsedData = {};

  bulkData.forEach((range: any) => {
    if (!range?.range) return;

    const sheetName = range.range.split("!")[0].replace(/'/g, "");
    const rows = range.values || [];

    if (rows.length > 0) {
      const [headers, ...dataRows] = rows;
      result[sheetName] = dataRows.map((row) => {
        const obj: Record<string, any> = {};
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] !== undefined ? row[index] : "";
        });
        return obj;
      });
    } else {
      result[sheetName] = [];
    }
  });
  return result;
}
