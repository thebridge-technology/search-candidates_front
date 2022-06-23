/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.REACT_APP_SERVICE_URL,
    API_URL_NODE: process.env.REACT_APP_SERVICE_URL_NODE
  }
}

module.exports = nextConfig

