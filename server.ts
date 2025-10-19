import indexFile from "./index.html";

Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);

    // Serve static files from src directory
    if (url.pathname.startsWith('/src/')) {
      const filePath = `.${url.pathname}`;
      const file = Bun.file(filePath);

      if (file.exists()) {
        return new Response(file);
      }
    }

    // Serve main HTML for all routes
    if (url.pathname === '/' || url.pathname === '/quiz' || url.pathname === '/result') {
      return new Response(indexFile, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    // 404 for unmatched routes
    return new Response('Not Found', { status: 404 });
  },
  development: {
    hmr: true,
    console: true,
  }
});

console.log('🚀 Server running at http://localhost:3000');