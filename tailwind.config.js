const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./mdx-components.tsx",
		"content/**/*.mdx",
	],

	theme: {
		extend: {
			colors: {
				// Music-inspired palette
				piano: {
					white: "#f5f0eb",
					black: "#1a1a2e",
					ivory: "#faf3e0",
				},
				score: {
					bg: "#0a0a0f",
					surface: "#12121a",
					line: "#1e1e2e",
					accent: "#6c63ff",
					gold: "#d4a853",
					rose: "#e84393",
					cyan: "#00cec9",
					warm: "#fd7014",
				},
			},
			typography: {
				DEFAULT: {
					css: {
						"code::before": { content: '""' },
						"code::after": { content: '""' },
					},
				},
				quoteless: {
					css: {
						"blockquote p:first-of-type::before": { content: "none" },
						"blockquote p:first-of-type::after": { content: "none" },
					},
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
				display: ["var(--font-calsans)"],
				mono: ["'JetBrains Mono'", ...defaultTheme.fontFamily.mono],
			},
			backgroundImage: {
				"gradient-radial":
					"radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-glow":
					"radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108,99,255,0.15), transparent)",
			},
			animation: {
				"fade-in": "fade-in 3s ease-in-out forwards",
				title: "title 3s ease-out forwards",
				"fade-left": "fade-left 3s ease-in-out forwards",
				"fade-right": "fade-right 3s ease-in-out forwards",
				"slide-up": "slide-up 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
				"slide-down": "slide-down 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
				float: "float 6s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s ease-in-out infinite",
				"piano-press": "piano-press 0.15s ease-out forwards",
				equalizer: "equalizer 1.2s ease-in-out infinite alternate",
				"spin-slow": "spin 20s linear infinite",
				"waveform": "waveform 1.5s ease-in-out infinite alternate",
				"note-float": "note-float 4s ease-in-out infinite",
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0%" },
					"75%": { opacity: "0%" },
					"100%": { opacity: "100%" },
				},
				"fade-left": {
					"0%": { transform: "translateX(100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				"fade-right": {
					"0%": { transform: "translateX(-100%)", opacity: "0%" },
					"30%": { transform: "translateX(0%)", opacity: "100%" },
					"100%": { opacity: "0%" },
				},
				title: {
					"0%": { "line-height": "0%", "letter-spacing": "0.25em", opacity: "0" },
					"25%": { "line-height": "0%", opacity: "0%" },
					"80%": { opacity: "100%" },
					"100%": { "line-height": "100%", opacity: "100%" },
				},
				"slide-up": {
					"0%": { transform: "translateY(40px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				"slide-down": {
					"0%": { transform: "translateY(-20px)", opacity: "0" },
					"100%": { transform: "translateY(0)", opacity: "1" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" },
				},
				"pulse-glow": {
					"0%, 100%": { opacity: "0.4", transform: "scale(1)" },
					"50%": { opacity: "1", transform: "scale(1.05)" },
				},
				"piano-press": {
					"0%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(3px)" },
					"100%": { transform: "translateY(0)" },
				},
				equalizer: {
					"0%": { height: "10%" },
					"100%": { height: "var(--eq-height, 80%)" },
				},
				waveform: {
					"0%": { transform: "scaleY(0.3)" },
					"100%": { transform: "scaleY(1)" },
				},
				"note-float": {
					"0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.7" },
					"50%": { transform: "translateY(-30px) rotate(10deg)", opacity: "1" },
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwindcss-debug-screens"),
	],
};
