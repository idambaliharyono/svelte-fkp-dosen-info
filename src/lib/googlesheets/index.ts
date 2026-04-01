import { google, sheets_v4 } from "googleapis";

interface ParsedData {
  [sheetName: string]: Record<string, any>[];
}

type RawDataRange = sheets_v4.Schema$ValueRange;
type BulkData = RawDataRange[] | undefined;
type SheetRow = string[];

export let isFetching = false;
export async function getCachedData(platform: App.Platform) {
  if (!isFetching) {
    isFetching = true;
    console.log("fetching in progress");
  }
  const KV = platform?.env?.SPREADSHEET_DOSEN_FKP;
  const CACHE_KEY = "spreadsheet_data";
  const CACHE_TTL = 86400 * 1;

  if (KV) {
    try {
      const t0 = performance.now();
      const cached = await KV.get(CACHE_KEY, { type: "json" });
      if (cached && typeof cached === "object" && !Array.isArray(cached)) {
        console.log(
          `serving from KV: ${(performance.now() - t0).toFixed(2)}ms`,
        );
        return cached as unknown as ParsedData;
      }
    } catch (error) {
      console.log("error:", error);
    }
  }
  const t1 = performance.now();
  const rawData = await fetchData(platform);
  const parsedData = await parseData(rawData);
  console.log(
    `serving from spreadsheet: ${(performance.now() - t1).toFixed(2)}ms`,
  );
  if (KV) {
    try {
      await KV.put(CACHE_KEY, JSON.stringify(parsedData), {
        expirationTtl: CACHE_TTL,
      });
      console.log("KV write success");
    } catch (error: any) {
      console.log("KV write error", error.message, error.cause);
      console.error("KV error details:", error);
      const serialized = JSON.stringify(parsedData);
      console.log(
        "KV payload size (bytes):",
        new TextEncoder().encode(serialized).length,
      );
    }
  }
  return parsedData;
}

async function fetchData(platform: App.Platform | undefined) {
  const env = platform?.env;
  try {
    const credentialsIsJson = env?.GOOGLE_CREDENTIALS_JSON;
    if (!credentialsIsJson) {
      throw new Error("Google Creds is not set");
    }
    const credentials = JSON.parse(credentialsIsJson);
    if (!credentials) {
      throw new Error("invalid credentials");
    }

    const spreadsheetId = "19alvGEzixbCd1cWERAMk9HAPpgLcMQe3rNg2YMwRmAY";
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const client = await auth.getClient();

    const sheets = google.sheets({ version: "v4", auth: client as any });
    const ranges = [
      "profil!A1:N100",
      "penelitian!A1:F5000",
      "mengajar!A1:G1000",
      "karya_ilmiah!A1:J1000",
      "pengabdian!A1:H1000",
      "matakuliah!A1:J1000",
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

async function parseData(bulkData: BulkData = []): Promise<ParsedData> {
  const result: ParsedData = {};

  bulkData.forEach((range: any) => {
    if (!range?.range) return;

    const sheetName = range.range.split("!")[0].replace(/'/g, "");
    const rows: SheetRow[] = range.values || [];

    if (rows.length > 0) {
      const [headers, ...dataRows] = rows;
      result[sheetName] = dataRows.map((row: SheetRow) => {
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
// defaults.ts
export const defaultSpreadsheet = {
  profil: [],
  karya_ilmiah: [],
  penelitian: [],
  pengabdian: [],
  mengajar: [],
  matakuliah: [],
};
