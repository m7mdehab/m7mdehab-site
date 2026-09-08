import { NextResponse } from "next/server";
import { capabilities, education, profile, skillGroups } from "@/data/public";
export const dynamic = "force-static";
export function GET() { return NextResponse.json({ name: profile.name, handle: profile.handle, location: profile.location, currentRole: profile.role, currentEmployer: profile.employer, proposition: profile.proposition, links: { website: profile.domain, github: profile.github, linkedin: profile.linkedin }, capabilities, skills: skillGroups, education }); }
