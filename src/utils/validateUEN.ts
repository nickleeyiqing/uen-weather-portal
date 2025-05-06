// Set of valid entity types used in Format C UENs (issued by various agencies)
const validEntityTypes = new Set([
  "LP", "LL", "FC", "PF", "RF", "MQ", "MM", "NB", "CC", "CS", "MB", "FM", "GS",
  "DP", "CP", "NR", "CM", "CD", "MD", "HS", "VH", "CH", "MH", "CL", "XL", "CX",
  "HC", "RP", "TU", "TC", "FB", "FI", "PA", "PB", "SS", "MC", "SM", "GA", "GB"
]);

/**
 * Validates a Singapore UEN (Unique Entity Number).
 * @param uen - The UEN string to validate.
 * @returns A string indicating whether the UEN is valid and its format.
 */

export function validateUEN(uen: string): string {
  // Convert to uppercase to ensure case-insensitive matching
  uen = uen.toUpperCase();

  // Format A: ACRA business registration (9-digit number + letter)
  if (/^\d{8}[A-Z]$/.test(uen)) {
    return "✅ Valid Format A (ACRA business)";
  }

  // Format B: ACRA local companies (10-digit: year + 6-digit + letter)
  if (/^\d{9}[A-Z]$/.test(uen)) {
    return "✅ Valid Format B (ACRA local company)";
  }

  // Format C: Other entities (TyyPQnnnnX) — starts with 'T', followed by 2-digit year, 2-char entity type, 4 digits, and a letter
  if (/^T\d{2}[A-Z]{2}\d{4}[A-Z]$/.test(uen)) {
    const entityType = uen.slice(3, 5); // Extract entity type from position 4–5 (PQ)
    return validEntityTypes.has(entityType)
      ? "✅ Valid Format C (Issued by other agencies)"
      : "❌ Invalid Format C (Unknown entity type)";
  }

  // If no pattern matches, the UEN is invalid
  return "❌ Invalid UEN format";
}