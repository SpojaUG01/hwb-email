import { serve } from "https://deno.land/std@0.135.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const { pathname } = new URL(req.url);

  if (pathname === "/") {
    return new Response("Hello from Deno!", {
      headers: { "content-type": "text/plain" },
    });
  } else if (pathname === "/api") {
    return new Response(JSON.stringify({ message: "Hello, API!" }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Not Found", { status: 404 });
};

console.log("Listening on http://localhost:8000");
serve(handler, { port: 8000 });
