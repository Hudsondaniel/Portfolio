import createMDX from "@next/mdx";

const withMDX = createMDX({
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
	webpack: (config) => {
		config.resolve.fallback = { fs: false, path: false };
		return config;
	},
};

export default withMDX(nextConfig);
