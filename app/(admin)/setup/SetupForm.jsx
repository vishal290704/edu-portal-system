"use client";

import { useState } from "react";

export default function SetupForm() {
  const [username, setUsername] = useState("superadmin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold">
        Dynamic English School
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Username
          </label>

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white"
        >
          {loading ? "Creating..." : "Create Super Admin"}
        </button>

        {message && (
          <p className="text-center text-sm">{message}</p>
        )}

      </form>
    </div>
  );
}