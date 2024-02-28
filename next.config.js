const overwrites = [
  {
    source: "/api/storefront/v1/:path*",
    destination: "http://localhost:9090/api/storefront/v1/:path*",
  },
  {
    source: "/media/:path*",
    destination: "http://localhost:9090/media/:path*",
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
