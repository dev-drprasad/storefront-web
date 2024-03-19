const overwrites = [
  {
    source: "/api/storefront/v1/:path*",
    destination: `${process.env.BACKEND_API_URI}/:path*`,
  },
  {
    source: "/media/:path*",
    destination: `${process.env.MEDIA_URI}/:path*`,
  }
]

const rewrites = async () => {
  return overwrites;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: rewrites,
}

module.exports = nextConfig
