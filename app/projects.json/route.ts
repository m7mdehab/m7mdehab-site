import { NextResponse } from "next/server";
import { projectRecords } from "@/data/discoverability";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(projectRecords);
}
