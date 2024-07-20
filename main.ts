import { serve } from "https://deno.land/std@0.135.0/http/server.ts";
import { join, extname } from "https://deno.land/std@0.135.0/path/mod.ts";
import { readFileStr } from "https://deno.land/std@0.135.0/fs/mod.ts";

const PORT = 8000;

const server = serve({ port: PORT });
console.log(`Server running on http://localhost:${PORT}`);

for await (const request of server) {
  try {
    let filePath = new URL(request.url, `http://localhost:${PORT}`).pathname;

    // Default to serving `login.html` on root path
    if (filePath === "/") {
      filePath = "/views/login.html";
    } else {
      // Serve files from the `public` directory if requested
      if (filePath.startsWith("/public/")) {
        filePath = `.${filePath}`;
      } else {
        filePath = `./views${filePath}`;
      }
    }

    const fullPath = join(Deno.cwd(), filePath);
    const fileExtension = extname(fullPath);
    let contentType = "text/plain";

    switch (fileExtension) {
      case ".html":
        contentType = "text/html";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".js":
        contentType = "application/javascript";
        break;
      // Add more cases as needed
    }

    try {
      const fileContent = await readFileStr(fullPath);
      request.respond({
        status: 200,
        body: fileContent,
        headers: new Headers({
          "Content-Type": contentType,
        }),
      });
    } catch (e) {
      request.respond({
        status: 404,
        body: "404 Not Found",
      });
    }
  } catch (e) {
    request.respond({
      status: 500,
      body: "500 Internal Server Error",
    });
  }
}
