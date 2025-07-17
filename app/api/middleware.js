import { NextResponse } from "next/server";

// Fonction de middleware
export function middleware(request) {
  const response = NextResponse.next();

  const allowedOrigins = [
    "https://le-plessis-aux-lys.fr",
    "https://www.le-plessis-aux-lys.fr",
  ]; // Ton domaine de production

  const origin = request.headers.get("origin");

  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  }

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers, // ✅ Réutilise les headers déjà définis
    });
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"], // Le middleware sera exécuté uniquement pour les routes qui commencent par /api/
};

