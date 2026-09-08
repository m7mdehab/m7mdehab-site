import { NextResponse } from "next/server";
import { projects } from "@/data/public";
export const dynamic = "force-static";
export function GET() { return NextResponse.json(projects.map(({ tone, ...project }) => project)); }
