import { BUILD_TIME, SITE_CREATED_DATE } from "@/lib/constants";
import type { Resume } from "@/lib/types/resume";
import { getContactUrl } from "@/lib/utils";

/**
 * Generates Person + ProfilePage structured data for the main profile
 */
export function generatePersonSchema(resumeData: Resume) {
  const emailLink = resumeData.contact.links.find((l) => l.type === "email");
  const socialLinks = resumeData.contact.links
    .filter((l) => l.type !== "email")
    .map((l) => getContactUrl(l));

  // Create identifier array for social media profiles
  const identifiers = resumeData.contact.links
    .filter((l) => l.type !== "email" && l.type !== "custom")
    .map((l) => ({
      "@type": "PropertyValue",
      propertyID: l.type,
      value: l.value,
    }));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: SITE_CREATED_DATE,
    dateModified: BUILD_TIME,
    mainEntity: {
      "@type": "Person",
      "@id": `${resumeData.url}#person`,
      name: resumeData.name,
    },
  };

  const person = schema.mainEntity as Record<string, unknown>;

  // Add optional fields only if they exist
  if (resumeData.username) {
    person.alternateName = resumeData.username;
  }

  if (resumeData.honorificSuffix) {
    person.honorificSuffix = resumeData.honorificSuffix;
  }

  if (resumeData.title) {
    person.jobTitle = resumeData.title;
  }

  if (resumeData.about) {
    person.description = resumeData.about;
  }

  person.url = resumeData.url;

  if (resumeData.image) {
    person.image = resumeData.image;
  }

  if (resumeData.location) {
    person.address = {
      "@type": "PostalAddress",
      addressLocality: resumeData.location,
    };
  }

  if (resumeData.nationality) {
    person.nationality = {
      "@type": "Country",
      name: resumeData.nationality,
    };
  }

  if (resumeData.gender) {
    person.gender = resumeData.gender;
  }

  if (resumeData.languages && resumeData.languages.length > 0) {
    person.knowsLanguage = resumeData.languages;
  }

  if (socialLinks.length > 0) {
    person.sameAs = socialLinks;
  }

  if (identifiers.length > 0) {
    person.identifier = identifiers;
  }

  if (emailLink) {
    person.email = emailLink.value;
  }

  // Add skills/expertise from keywords
  if (resumeData.meta.keywords && resumeData.meta.keywords.length > 0) {
    person.knowsAbout = resumeData.meta.keywords;
  }

  // Add current employer from most recent experience
  const experienceSection = resumeData.sections.find(
    (s) => s.type === "experience",
  );
  if (experienceSection && experienceSection.items.length > 0) {
    const currentJob = experienceSection.items[0];
    if (
      currentJob.type === "timeline" &&
      currentJob.period?.toLowerCase().includes("present")
    ) {
      person.worksFor = {
        "@type": "Organization",
        name: currentJob.title,
      };
    }
  }

  // Add education from education section
  const educationSection = resumeData.sections.find(
    (s) => s.type === "education",
  );
  if (educationSection && educationSection.items.length > 0) {
    const institutions = educationSection.items
      .filter((item) => item.type === "timeline")
      .map((item) => ({
        "@type": "EducationalOrganization",
        name: item.title,
      }));

    if (institutions.length > 0) {
      person.alumniOf = institutions;
    }
  }

  // Add awards from sections with type="award"
  const awardSections = resumeData.sections.filter((s) => s.type === "award");
  const awards: string[] = [];

  awardSections.forEach((section) => {
    section.items.forEach((item) => {
      if (item.type === "summary") return;
      // Format: "Title - Subtitle" or just title if no subtitle
      const awardText = item.subtitle
        ? `${item.title} - ${item.subtitle}`
        : item.title;
      awards.push(awardText);
    });
  });

  if (awards.length > 0) {
    person.award = awards;
  }

  return schema;
}
