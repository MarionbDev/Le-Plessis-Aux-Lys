// lib/cors.ts

const allowedOrigins = [
  "https://le-plessis-aux-lys.fr",
  "https://www.le-plessis-aux-lys.fr",
];

export function withCorsHeaders(response: Response, origin?: string): Response {
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://www.le-plessis-aux-lys.fr",
    ); // fallback
  }

  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

