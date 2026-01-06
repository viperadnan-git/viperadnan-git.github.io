import { ResumeSchema, RESUME_SCHEMA_VERSION } from "@/lib/types/resume";
import type { Resume } from "@/lib/types/resume";

// Supported version range (semver major version must match)
function isVersionCompatible(dataVersion: string): boolean {
  const [dataMajor] = dataVersion.split(".");
  const [schemaMajor] = RESUME_SCHEMA_VERSION.split(".");
  return dataMajor === schemaMajor;
}

// Cache the result to avoid multiple fetches during build
let cachedData: Resume | null = null;

export async function getResumeData(): Promise<Resume> {
  if (cachedData) return cachedData;

  const url = process.env.RESUME_DATA_URL;

  let data: unknown;
  if (url) {
    console.log(`Fetching resume data from: ${url}`);
    const res = await fetch(url, {
      cache: "force-cache",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch resume data: ${res.status} ${res.statusText}`,
      );
    }

    data = await res.json();
  } else {
    data = (await import("./resume.json")).default;
  }

  // Validate against Zod schema
  const result = ResumeSchema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid resume data format:\n${errorMessage}`);
  }

  const resumeData = result.data;

  // Validate version compatibility
  if (!isVersionCompatible(resumeData.version)) {
    throw new Error(
      `Resume data version mismatch. ` +
        `Expected version compatible with ${RESUME_SCHEMA_VERSION}, ` +
        `but got ${resumeData.version}. ` +
        `Please update your resume data to match the schema version.`,
    );
  }

  cachedData = resumeData;
  return cachedData;
}
