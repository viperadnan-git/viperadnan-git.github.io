import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod/v4";
import { RESUME_SCHEMA_VERSION, ResumeSchema } from "../lib/types/resume";

// Generate JSON schema from Zod schema
const jsonSchema = z.toJSONSchema(ResumeSchema, {
  target: "draft-7",
});

// Add schema metadata
const schemaWithMeta = {
  $schema: "http://json-schema.org/draft-07/schema#",
  ...jsonSchema,
  title: "Resume",
  description: `Portfolio resume data schema (version ${RESUME_SCHEMA_VERSION})`,
};

// Write to public folder
const outputPath = join(process.cwd(), "public", "resume.schema.json");
writeFileSync(outputPath, JSON.stringify(schemaWithMeta, null, 2));

// keep the generated file in Biome's format, or every build fights the linter
spawnSync("bunx", ["biome", "format", "--write", outputPath], {
  stdio: "ignore",
});

console.log(`JSON schema generated at: ${outputPath}`);
