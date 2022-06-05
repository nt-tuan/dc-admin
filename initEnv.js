const fs = require("fs");
const envFile = process.env.ENV_FILE ?? process.argv[2] ?? "./.env";
const data = fs.readFileSync(envFile, { encoding: "utf8", flag: "r" });
const lines = data.split(/\r?\n/);
const configContentLines = [];
const getValue = (key, valueParts) => {
  if (valueParts == null || valueParts.length === 0) return process.env[key];
  const envValue = valueParts.join("=");
  if (envValue) return envValue;
  return process.env[key];
};
for (const line of lines) {
  const parts = line.split("=");
  const [key, ...valueParts] = parts;
  if (!key) continue;
  const envValue = getValue(key, valueParts);
  if (envValue) configContentLines.push(`\t"${key}":"${envValue}"`);
}
const configContent = `
var _env_ = {
${configContentLines.join(",\r\n")}
}
`;
fs.writeFileSync("./public/env-config.js", configContent, { encoding: "utf8", flag: "w" });
