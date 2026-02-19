"use client";

import Button from "@/components/common/Button/Button";
import { RegisterUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    bio: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors = {};

    if (form.fullname.length < 6)
      newErrors.fullname = "Full name must be at least 6 characters";

    if (form.username.length < 6)
      newErrors.username = "Username must be at least 6 characters";

    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (form.password.length < 4)
      newErrors.password = "Password must be at least 4 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await RegisterUser(form);
      toast.success(res.message);
      router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-neutral-950 p-8 rounded-xl shadow-lg space-y-4"
      >

        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>

        {/* Fullname */}
        <div>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={form.fullname}
            onChange={handleChange}
            className="input"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <textarea
            name="bio"
            placeholder="Bio"
            rows="3"
            value={form.bio}
            onChange={handleChange}
            className="input resize-none"
          />
          
        </div>

        {/* Submit */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full"
        >
          {loading ? "Creating..." : "Register"}
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>

      </form>

    </div>
  );
}
