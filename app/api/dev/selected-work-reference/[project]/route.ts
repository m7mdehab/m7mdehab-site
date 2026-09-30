import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const projects = new Set([
  "presaira",
  "opportunityos",
  "ghareeb-oglu",
  "solar-site-selection",
  "oil-spill-detection",
  "makhbazy",
]);

export function generateStaticParams() {
  return [...projects].map((project) => ({ project }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ project: string }> },
) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  const { project } = await params;
  if (!projects.has(project)) return new NextResponse(null, { status: 404 });

  const filename = path.join(
    process.cwd(),
    "design",
    "selected-work",
    "reference",
    "full",
    `${project}.png`,
  );
  const image = await readFile(filename);

  return new NextResponse(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
