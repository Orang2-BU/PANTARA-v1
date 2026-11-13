export function GET() {
  return Response.json({ status: "ok", service: "pantara-frontend", mode: "static" });
}
