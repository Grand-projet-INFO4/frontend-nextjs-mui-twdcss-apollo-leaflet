// The possible user role values
export enum UserRole {
  Basic = "BASIC",
  Manager = "MANAGER",
  Regulator = "REGULATOR",
  Driver = "DRIVER",
  Admin = "ADMIN",
  SuperAdmin = "SUPER_ADMIN",
}

// The roles related to a cooperative
export const cooperativeRoles = [UserRole.Manager, UserRole.Regulator, UserRole.Driver];
// Set from the above roles
export const cooperativeRolesSet = new Set(cooperativeRoles);

// The roles related to the administration of the application
export const adminRoles = [UserRole.SuperAdmin, UserRole.Admin];
export const adminRolesSet = new Set(adminRoles);

// Map of user roles and their translations
const userRoleTranslationMap = new Map<UserRole, string>();
userRoleTranslationMap.set(UserRole.Manager, "Gérant");
userRoleTranslationMap.set(UserRole.Regulator, "Régulateur");
userRoleTranslationMap.set(UserRole.Driver, "Chauffeur");
userRoleTranslationMap.set(UserRole.Admin, "Administrateur");
userRoleTranslationMap.set(UserRole.SuperAdmin, "Super Administrateur");

// The pathname for the authenticated user's panel
export const AUTH_USER_PANEL_PATH = "/user-panel"

export { userRoleTranslationMap };
