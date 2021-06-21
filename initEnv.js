const fs = require("fs");
const envFile = process.env.ENV_FILE ?? process.argv[2] ?? "./.env";
const data = fs.readFileSync(envFile, { encoding: "utf8", flag: "r" });
const lines = data.split(/\r?\n/);
const configContentLines = [];
for (const line of lines) {
  const parts = line.split("=");
  const [key, ...valueParts] = parts;
  if (!key || !valueParts || valueParts.length === 0) continue;
  const value = valueParts.join("=");
  configContentLines.push(`\t"${key}":"${value}"`);
}
const configContent = `
var _env_ = {
${configContentLines.join(",\r\n")}
}
`;
fs.writeFileSync("./public/env-config.js", configContent, { encoding: "utf8", flag: "w" });
