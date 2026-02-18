/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    domains: ["res.cloudinary.com", "localhost", "ik.imagekit.io"],
  },
  /* config options here */
  reactCompiler: true,
  output: 'export',
  trailingSlash: true
};

export default nextConfig;
