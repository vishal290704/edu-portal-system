export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout Error:", error);
  }
}