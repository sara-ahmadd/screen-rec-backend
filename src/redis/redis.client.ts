import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
let redisAvailable = false;

export function isRedisAvailable() {
  return redisAvailable;
}

export async function initRedis() {
  const url = process.env.REDIS_URL || "redis://localhost:6379";

  client = createClient({
    url,
    socket: {
      // Retry with backoff, but don't crash the app
      reconnectStrategy: (retries) => Math.min(1000 * 2 ** retries, 15_000),
    },
  });

  client.on("ready", () => {
    redisAvailable = true;
    console.log("✅ Redis ready");
  });

  client.on("end", () => {
    redisAvailable = false;
    console.warn("⚠️ Redis connection ended");
  });

  client.on("error", (err) => {
    redisAvailable = false;
    console.warn("⚠️ Redis error (fallback mode):", err?.message || err);
  });

  try {
    await client.connect();
  } catch (e: any) {
    redisAvailable = false;
    console.warn("⚠️ Redis connect failed (fallback mode):", e?.message || e);
  }
}

export function getRedisClient() {
  return client;
}
