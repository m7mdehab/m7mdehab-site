import { NextResponse } from "next/server";
import { serviceRecords } from "@/data/discoverability";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(serviceRecords);
}
