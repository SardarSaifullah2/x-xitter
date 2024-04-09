/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns :[
            {
                hostname: "*.ftcdn.net"
            },
            {
                hostname: "*.githubusercontent.com"
            },
            {
                hostname: "*.twimg.com"
            },
            {
                hostname: "*.amazonaws.com"
            },
            {
                hostname: "*.googleusercontent.com"
            },
            {
                hostname: "*.freepik.com"
            },
        ]
    } ,   
    experimental: {
        serverActions: {
          allowedOrigins: ["super-space-fortnight-rqx779xjqpr34rr-3000.app.github.dev", "localhost:3000"]
        }
      }


};
export default nextConfig;
