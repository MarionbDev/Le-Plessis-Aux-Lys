import { NextResponse } from "next/server";

// Fonction de middleware
export function middleware(request) {
  const response = NextResponse.next();

  const allowedOrigin = "https://le-plessis-aux-lys.fr"; // Ton domaine de production

  const origin = request.headers.get("origin");

  if (origin && origin === allowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204 });
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"], // Le middleware sera exécuté uniquement pour les routes qui commencent par /api/
};

