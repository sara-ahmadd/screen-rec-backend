import path from "node:path";
import dotenv from "dotenv";
// Load .env once globally
dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});
// Optional: validate required vars early
const required = ["JWT_SECRET", "GMAIL_USER", "GMAIL_PASS"];
for (const key of required) {
    if (!process.env[key]) {
        console.warn(`⚠️ Missing env variable: ${key}`);
    }
}
export {}; // makes this a module
//# sourceMappingURL=env.js.map