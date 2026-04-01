import { google } from "googleapis";
import type { LayoutServerLoad } from "./$types";
import { getCachedData } from "$lib/googlesheets";

export const load: LayoutServerLoad = async ({ platform }) => {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // fake 2s delay
  const data = await getCachedData(platform);
  return {
    spreadsheet: data,
  };
};
