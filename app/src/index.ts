import { Hono } from "hono";
import { auth } from "./lib/better-auth";
import type { betterAuth } from "better-auth";
import { cors } from "hono/cors";

type AuthInstance = ReturnType<typeof betterAuth>;

const app = new Hono<{
  Bindings: CloudflareBindings;
  Variables: {
    user: AuthInstance["$Infer"]["Session"]["user"] | null;
    session: AuthInstance["$Infer"]["Session"]["session"] | null;
  };
}>();

app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:5173", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const authInstance = auth(c.env);
  const session = await authInstance.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

app.on(["GET", "POST"], "/api/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});

app.get("/", (c) => c.text("ok"));

export default app;
