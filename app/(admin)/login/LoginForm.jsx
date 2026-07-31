"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    admissionNo: "",
    dob: "",
  });
  const [loginType, setLoginType] = useState("staff");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const endpoint =
        loginType === "staff" ? "/api/auth/login" : "/api/auth/student-login";

      const body =
        loginType === "staff"
          ? {
              username: formData.username,
              password: formData.password,
            }
          : {
              admissionNo: formData.admissionNo,
              dob: formData.dob,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Temporary role-based redirect
      if (data.role === "SUPER_ADMIN" || data.role === "ADMIN") {
        router.push("/admin");
      } else if (data.role === "TEACHER") {
        router.push("/teacher");
      } else if (data.role === "STUDENT") {
        router.push("/student");
      } else {
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Dynamic English School</h1>

        <p className="mt-2 text-sm text-gray-500">Login to continue</p>
      </div>
      <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => {
            setLoginType("staff");
            setShowPassword(false);
            setError("");
            setFormData({
              username: "",
              password: "",
              admissionNo: "",
              dob: "",
            });
          }}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
            loginType === "staff"
              ? "bg-white shadow text-blue-600"
              : "text-gray-600"
          }`}
        >
          Staff Login
        </button>

        <button
          type="button"
          onClick={() => {
            setLoginType("student");
            setShowPassword(false);
            setError("");
            setFormData({
              username: "",
              password: "",
              admissionNo: "",
              dob: "",
            });
          }}
          className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
            loginType === "student"
              ? "bg-white shadow text-blue-600"
              : "text-gray-600"
          }`}
        >
          Student Login
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {loginType === "staff" ? (
          <>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required={loginType === "staff"}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-lg border px-4 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                  required={loginType === "staff"}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Admission Number
              </label>

              <input
                type="text"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                placeholder="Enter admission number"
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required={loginType === "student"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                required={loginType === "student"}
              />
            </div>
          </>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={18} />
              Signing In...
            </>
          ) : loginType === "staff" ? (
            "Staff Login"
          ) : (
            "Student Login"
          )}
        </button>
      </form>
    </div>
  );
}
