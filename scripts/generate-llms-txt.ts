import { ResumeSchema, RESUME_SCHEMA_VERSION } from "../lib/types/resume";
import { generateLlmsTxt } from "../lib/llms-txt";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const raw = JSON.parse(
  readFileSync(join(process.cwd(), "lib/data/resume.json"), "utf-8"),
);

const result = ResumeSchema.safeParse(raw);
if (!result.success) {
  throw new Error(`Invalid resume data: ${result.error}`);
}

const [dataMajor] = result.data.version.split(".");
const [schemaMajor] = RESUME_SCHEMA_VERSION.split(".");
if (dataMajor !== schemaMajor) {
  throw new Error(`Version mismatch: ${result.data.version}`);
}

const content = generateLlmsTxt(result.data);
const outputPath = join(process.cwd(), "public", "llms.txt");
writeFileSync(outputPath, content);
console.log(`llms.txt generated at: ${outputPath}`);
