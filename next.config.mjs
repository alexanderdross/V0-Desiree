/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/charts',
        destination: '/#cart-options',
        permanent: false, // 302 redirect
      },
      {
        source: '/charts/',
        destination: '/#cart-options',
        permanent: false, // 302 redirect
      },
      {
        source: '/equipment',
        destination: '/#equipment',
        permanent: false, // 302 redirect
      },
      {
        source: '/equipment/',
        destination: '/#equipment',
        permanent: false, // 302 redirect
      },
      {
        source: '/packages',
        destination: '/#packages',
        permanent: false, // 302 redirect
      },
      {
        source: '/packages/',
        destination: '/#packages',
        permanent: false, // 302 redirect
      },
      {
        source: '/carts',
        destination: '/#cart-options',
        permanent: false, // 302 redirect
      },
      {
        source: '/carts/',
        destination: '/#cart-options',
        permanent: false, // 302 redirect
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: false, // 302 redirect
      },
      {
        source: '/about/',
        destination: '/#about',
        permanent: false, // 302 redirect
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: false, // 302 redirect
      },
      {
        source: '/contact/',
        destination: '/#contact',
        permanent: false, // 302 redirect
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://vercel.live https://vitals.vercel-insights.com https://api.stripe.com",
              "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

export default nextConfig
