import { z } from "zod/v4";
import { ResumeSchema, RESUME_SCHEMA_VERSION } from "../lib/types/resume";
import { writeFileSync } from "fs";
import { join } from "path";

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

console.log(`JSON schema generated at: ${outputPath}`);
