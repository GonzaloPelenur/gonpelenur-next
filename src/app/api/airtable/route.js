import { NextResponse } from "next/server";
import Airtable from "airtable";

const fetchAirtableData = async () => {
    
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  const records = await base("Content").select({ view: "MAIN" }).all();
  // console.log(JSON.stringify(records, null, 4))
  const fields = records
    .filter((item) => Object.keys(item.fields).length !== 0) // exclude items where fields is empty
    .map((item) => item.fields);
  // console.log(fields)

  return {
    airtableData: JSON.parse(JSON.stringify(fields)),
  };
};

export async function GET(request) {
  try {
    const airtableData = await fetchAirtableData(); // Simplified call
    return NextResponse.json({ result: airtableData });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ result: "" });
    // console.error("Error fetching Airtable data:", error);
    // return NextResponse.error(new Error("Failed to fetch Airtable data"));
  }
}