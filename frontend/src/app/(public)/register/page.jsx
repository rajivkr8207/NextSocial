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
  const router = useRouter()

  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // function handleImage(e) {
  //   const file = e.target.files[0];
  //   setImage(file);

  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //   }
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await RegisterUser(form)
      toast.success(res.message)
      router.push('/login')
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
    // const data = new FormData();
    // Object.entries(form).forEach(([key, value]) =>
    //   data.append(key, value)
    // );
    // data.append("profileImage", image);

    // Example API call
    // await fetch("/api/register", { method: "POST", body: data });

    // console.log("Register Data Submitted");
    // console.log(form);
    // console.log(image);
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

        {/* Profile Image */}
        {/* <div className="flex flex-col items-center gap-2">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-sm text-gray-500">
                Photo
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="text-sm"
          />
        </div> */}

        {/* Inputs */}
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={form.fullname}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="input"
        />

        <textarea
          name="bio"
          placeholder="Bio"
          rows="3"
          value={form.bio}
          onChange={handleChange}
          className="input resize-none"
        />

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
