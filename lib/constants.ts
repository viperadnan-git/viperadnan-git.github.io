/**
 * Build-time constants
 * These values are set at build time and remain consistent across all pages
 */

/**
 * The timestamp when the site was built
 * Used for dateModified in structured data
 */
export const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();

/**
 * The date when the portfolio was created
 * Used for dateCreated in structured data
 */
export const SITE_CREATED_DATE = "2025-01-01T00:00:00Z";
