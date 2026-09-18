export function isStaffRole(role?: string | null): boolean {
  const normalized = role?.toLowerCase();
  return normalized === 'admin' || normalized === 'jury';
}
