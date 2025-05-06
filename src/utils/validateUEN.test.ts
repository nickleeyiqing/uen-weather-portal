import { validateUEN } from './validateUEN';

describe('validateUEN', () => {
  it('validates format A (9 digits)', () => {
    expect(validateUEN('12345678A')).toBe('✅ Valid Format A (ACRA business)');
  });

  it('validates format B (10 digits)', () => {
    expect(validateUEN('201912345A')).toBe('✅ Valid Format B (ACRA local company)');
  });

  it('validates format C with known entity type', () => {
    expect(validateUEN('T09LL0001B')).toBe('✅ Valid Format C (Issued by other agencies)');
  });

  it('rejects invalid UENs', () => {
    expect(validateUEN('ABC123')).toBe('❌ Invalid UEN format');
    expect(validateUEN('T09ZZ0001B')).toBe('❌ Invalid Format C (Unknown entity type)');
  });
});
