/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:"/admin",
  redirects:async()=> {
    return [
      {
        source:'/',
        destination:'/login',
        permanent:false
      }
    ]
  },
  images: {
    path:"/admin/_next/image",
    domains: ['i.ibb.co','res.cloudinary.com','lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
