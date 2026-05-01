const request = require("supertest");
const app = require("../app");

test("GET / should return 200", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("GET /nonexistent should return 404", async () => {
  const res = await request(app).get("/does-not-exist");
  expect(res.statusCode).toBe(404);
});

test("GET / should include messages", async () => {
  const res = await request(app).get("/");

  expect(res.statusCode).toBe(200);
  expect(res.text).toMatch(/Hi there!/);
  expect(res.text).toMatch(/Hello World!/);
});

test("GET /new should return form page", async () => {
  const res = await request(app).get("/new");

  expect(res.statusCode).toBe(200);
  expect(res.text).toMatch(/new message/i);
});

test("POST /new should create a new message", async () => {
  const res = await request(app).post("/new").send({
    user: "Michanoku",
    text: "Test message",
  });
  expect(res.statusCode).toBe(302);

  const res2 = await request(app).get("/");
  expect(res2.text).toMatch(/Test message/);
});

test("GET /message/:id with invalid id should return 404", async () => {
  const res = await request(app).get("/message/invalid-id");
  expect(res.statusCode).toBe(404);
});

test("VIEW link should lead to message page", async () => {
  const indexRes = await request(app).get("/");
  expect(indexRes.statusCode).toBe(200);

  const match = indexRes.text.match(/href="(\/message\/[^"]+)"/);
  expect(match).not.toBeNull();

  const url = match[1];
  const viewRes = await request(app).get(url);
  expect(viewRes.statusCode).toBe(200);
});
