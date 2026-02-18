"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUploader({setImage, preview, setPreview}) {
  const [dragActive, setDragActive] = useState(false);

  function handleFile(file) {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleChange(e) {
    const file = e.target.files[0];
    handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  return (
    <div className="w-full">

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center transition
        ${
          dragActive
            ? "border-blue-500 bg-blue-50 dark:bg-neutral-800"
            : "border-gray-300 dark:border-neutral-700"
        }`}
      >

        {preview ? (
          <Image
            src={preview}
            alt="preview"
            fill
            className="object-cover rounded-xl"
          />
        ) : (
          <div className="text-center space-y-2">
            <p className="text-gray-500">
              Drag & Drop Image Here
            </p>
            <p className="text-sm text-gray-400">
              or click to upload
            </p>
          </div>
        )}

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

      </div>
    </div>
  );
}
