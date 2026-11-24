import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to the app root for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(url.pathname === "/" ? "app" : "missing", {
            status: url.pathname === "/" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/"]);
});

test("serves app routes to link preview crawlers without an HTML Accept header", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/work", { headers: { accept: "*/*", "user-agent": "LinkedInBot/1.0" } }),
    {
      ASSETS: {
        fetch: async (request) => new Response(new URL(request.url).pathname === "/" ? "app" : "missing", {
          status: new URL(request.url).pathname === "/" ? 200 : 404,
        }),
      },
    },
  );

  assert.equal(response.status, 200);
});

test("gives the selected-work route its own sharing metadata", async () => {
  const rootHtml = '<title>Timothy Harrelson | Senior Product Designer</title><link rel="canonical" href="https://tsharrelson.com/" /><meta property="og:url" content="https://tsharrelson.com/" />';
  const response = await worker.fetch(
    new Request("https://tsharrelson.com/work", { headers: { accept: "*/*" } }),
    {
      ASSETS: {
        fetch: async (request) => new Response(new URL(request.url).pathname === "/" ? rootHtml : "missing", {
          status: new URL(request.url).pathname === "/" ? 200 : 404,
        }),
      },
    },
  );

  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /<title>Selected Work \| Timothy Harrelson<\/title>/);
  assert.match(html, /rel="canonical" href="https:\/\/tsharrelson.com\/work"/);
  assert.match(html, /property="og:url" content="https:\/\/tsharrelson.com\/work"/);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});
