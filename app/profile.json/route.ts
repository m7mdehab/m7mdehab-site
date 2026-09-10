import { NextResponse } from "next/server";
import { profileRecord } from "@/data/discoverability";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(profileRecord);
}
