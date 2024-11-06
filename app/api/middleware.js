import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://le-plessis-aux-lys.fr",
  );
  response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

