/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		MAPBOX_GL_TOKEN: process.env.MAPBOX_GL_TOKEN,
	},
};

export default nextConfig;
