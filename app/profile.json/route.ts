import { NextResponse } from "next/server";
import { profileRecord } from "@/data/discoverability";
import { cleanPublicValue } from "@/data/public-surface";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(cleanPublicValue(profileRecord));
}
