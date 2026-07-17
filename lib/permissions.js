export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
};

export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: ["*"],

  [ROLES.ADMIN]: [
    "dashboard",
    "students",
    "teachers",
    "admissions",
    "attendance",
    "results",
    "fees",
    "announcements",
  ],

  [ROLES.TEACHER]: [
    "dashboard",
    "students:view",
    "attendance",
    "results",
  ],

  [ROLES.STUDENT]: [
    "dashboard",
    "profile",
    "attendance:view",
    "results:view",
  ],
};