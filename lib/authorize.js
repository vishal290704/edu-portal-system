import { PERMISSIONS } from "./permissions";

/**
 * Check if a user has a specific permission.
 */
export function hasPermission(user, permission) {
  if (!user) return false;

  const permissions = PERMISSIONS[user.role] || [];

  return (
    permissions.includes("*") ||
    permissions.includes(permission)
  );
}

/**
 * Check if a user has one of the allowed roles.
 */
export function hasRole(user, roles) {
  if (!user) return false;

  return roles.includes(user.role);
}

/**
 * Throw an error if permission is missing.
 * Useful inside Server Components and API Routes.
 */
export function requirePermission(user, permission) {
  if (!hasPermission(user, permission)) {
    throw new Error("Unauthorized");
  }
}

/**
 * Throw an error if role is not allowed.
 */
export function requireRole(user, roles) {
  if (!hasRole(user, roles)) {
    throw new Error("Unauthorized");
  }
}