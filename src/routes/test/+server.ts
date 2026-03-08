import { getCachedData } from "$lib/googlesheets";
import { json } from "@sveltejs/kit";

export async function GET({ platform }) {
  const data = await getCachedData(platform);
  return json(data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
