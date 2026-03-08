import { google } from "googleapis";
import type { LayoutServerLoad } from "./$types";
import { getCachedData } from "$lib/googlesheets";

export const load: LayoutServerLoad = async ({ platform }) => {
  const data = await getCachedData(platform);
  return {
    spreadsheet: data,
  };
};
