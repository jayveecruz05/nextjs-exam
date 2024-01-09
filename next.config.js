/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
  env: {
    NEXT_APP_API_BASE_URL: 'https://jsonplaceholder.typicode.com'
  }
}
module.exports = withNextIntl(nextConfig)
