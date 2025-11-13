import assert from "assert";
import http from "http";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:4000";

function request(method: string, path: string, body?: any): Promise<{ status: number; data: any }> {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : undefined;
    const req = http.request(
      BASE_URL + path,
      {
        method,
        headers: data
          ? {
              "Content-Type": "application/json",
              "Content-Length": Buffer.byteLength(data),
            }
          : {},
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          let parsed: any = null;
          try {
            parsed = raw ? JSON.parse(raw) : null;
          } catch {
            parsed = raw;
          }
          resolve({ status: res.statusCode || 0, data: parsed });
        });
      }
    );
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log("Running basic API tests...");

  // GET /
  const root = await request("GET", "/");
  assert.equal(root.status, 200);

  // GET /api/books
  const list = await request("GET", "/api/books");
  assert.equal(list.status, 200);
  assert.ok(Array.isArray(list.data));

  // POST /api/books
  const created = await request("POST", "/api/books", {
    title: "Test Driven Development",
    author: "Kent Beck",
    year: 2003,
    pages: 220,
  });
  assert.equal(created.status, 201);
  assert.ok(created.data.id);

  const createdId = created.data.id;

  // PATCH /api/books/:id
  const updated = await request("PATCH", `/api/books/${createdId}`, {
    finished: true,
  });
  assert.equal(updated.status, 200);
  assert.equal(updated.data.finished, true);

  // DELETE /api/books/:id
  const deleted = await request("DELETE", `/api/books/${createdId}`);
  assert.equal(deleted.status, 204);

  console.log("✅ All tests passed");
}

runTests().catch((err) => {
  console.error("❌ Tests failed", err);
  process.exit(1);
});
