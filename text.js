import http from "http";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  if (req.method === "POST" && req.url === "/post") {
    res.end("POST request received\n");
  }
});
server.listen(9000, () => {
  console.log("Server running at http://localhost:9000/");
});
