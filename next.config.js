const rewrites = () => {
  return [
    {
      source: "/api",
      destination: "http://localhost:8080",
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: rewrites,
}

module.exports = nextConfig
