import "../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import SmoothScroll from "./components/smooth-scroll";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = localFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://portfolio-hudson.vercel.app"),
	title: {
		default: "Hudson Daniel — Software Engineer · Music Producer · Piano Player",
		template: "%s | Hudson Daniel",
	},
	description:
		"Software engineer, music producer, and piano player. Composing code like music — one function at a time.",
	openGraph: {
		title: "Hudson Daniel",
		description:
			"Software engineer, music producer, and piano player. Composing code like music.",
		url: "https://portfolio-hudson.vercel.app",
		siteName: "Hudson Daniel",
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Hudson Daniel",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-score-bg cursor-none md:cursor-none ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
