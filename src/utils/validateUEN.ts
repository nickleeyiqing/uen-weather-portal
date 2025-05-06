const validEntityTypes = new Set([
    "LP", "LL", "FC", "PF", "RF", "MQ", "MM", "NB", "CC", "CS", "MB", "FM", "GS",
    "DP", "CP", "NR", "CM", "CD", "MD", "HS", "VH", "CH", "MH", "CL", "XL", "CX",
    "HC", "RP", "TU", "TC", "FB", "FI", "PA", "PB", "SS", "MC", "SM", "GA", "GB"
  ]);
  
  export function validateUEN(uen: string): string {
    uen = uen.toUpperCase();
  
    if (/^\d{8}[A-Z]$/.test(uen)) {
      return "✅ Valid Format A (ACRA business)";
    }
  
    if (/^\d{9}[A-Z]$/.test(uen)) {
      return "✅ Valid Format B (ACRA local company)";
    }
  
    if (/^T\d{2}[A-Z]{2}\d{4}[A-Z]$/.test(uen)) {
      const entityType = uen.slice(3, 5);
      return validEntityTypes.has(entityType)
        ? "✅ Valid Format C (Issued by other agencies)"
        : "❌ Invalid Format C (Unknown entity type)";
    }
  
    return "❌ Invalid UEN format";
  }
  