import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("tag");
  if (!path) return NextResponse.json({ error: "invalid path" });
  console.log("path: ", path);

  revalidatePath("/products");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
