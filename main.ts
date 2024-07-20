import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { extname } from "https://deno.land/std@0.135.0/path/mod.ts";

const server = serve({ port: 8000 });

console.log("HTTP webserver running. Access it at: http://localhost:8000/");

for await (const req of server) {
  let filePath = `./views${req.url}`;
  if (req.url === "/") {
    filePath = "./views/login.html";
  }

  try {
    const fileContents = await Deno.readTextFile(filePath);
    let contentType = "text/html";

    switch (extname(filePath)) {
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "application/javascript";
        break;
    }

    req.respond({
      status: 200,
      body: fileContents,
      headers: new Headers({
        "Content-Type": contentType,
      }),
    });
  } catch {
    req.respond({ status: 404, body: "File not found" });
  }
}
