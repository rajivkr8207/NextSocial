"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ImageUploader from "@/components/post/ImageUploader";
import { useRouter } from "next/navigation";
import { CreateMyPost } from "@/lib/posts";
import Button from "@/components/common/Button/Button";

export default function CreatePost() {
    const router = useRouter()
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!image) {
            return toast.error("Please select an image");
        }
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("imageurl", image);
            formData.append("caption", caption);
            if (image.size < 2000000) {
                await CreateMyPost(formData)
                toast.success("Post created successfully");
                setCaption("");
                setImage(null);
                setPreview(null);
                router.push('/')
            } else {
                toast.error('please make image size less then 2mb')
            }

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black flex justify-center py-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-center">
                    Create New Post
                </h1>

                <ImageUploader setImage={setImage} setPreview={setPreview} preview={preview} />
                <textarea
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows="3"
                    className="w-full p-3 border rounded-lg bg-transparent outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <Button
                    disabled={loading}
                    type="submit"
                    className="w-full py-2 rounded-lg transition disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Share"}
                </Button>

            </form>

        </div>
    );
}
