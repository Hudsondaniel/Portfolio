"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Particles from "../particles";

// Piano key data: white keys with optional black keys
const PIANO_KEYS = [
	{ note: "C", hasBlack: true },
	{ note: "D", hasBlack: true },
	{ note: "E", hasBlack: false },
	{ note: "F", hasBlack: true },
	{ note: "G", hasBlack: true },
	{ note: "A", hasBlack: true },
	{ note: "B", hasBlack: false },
	{ note: "C2", hasBlack: true },
	{ note: "D2", hasBlack: true },
	{ note: "E2", hasBlack: false },
	{ note: "F2", hasBlack: true },
	{ note: "G2", hasBlack: true },
	{ note: "A2", hasBlack: true },
	{ note: "B2", hasBlack: false },
];

function PianoKeyboard() {
	const playKeyAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.currentTarget;
		target.classList.add("animate-piano-press");
		// Create a ripple glow effect
		const glow = document.createElement("div");
		glow.className =
			"absolute inset-0 bg-score-accent/20 rounded-b-md pointer-events-none";
		glow.style.animation = "fade-in 0.3s ease-out forwards";
		target.appendChild(glow);
		setTimeout(() => {
			target.classList.remove("animate-piano-press");
			glow.remove();
		}, 300);
	};

	return (
		<div className="relative flex items-end justify-center gap-[2px] h-40 md:h-52 opacity-40 hover:opacity-70 transition-opacity duration-700">
			{PIANO_KEYS.map((key, i) => (
				<div key={key.note} className="relative">
					{/* White key */}
					<motion.div
						className="piano-key relative w-8 md:w-10 h-32 md:h-44 bg-gradient-to-b from-piano-ivory to-piano-white rounded-b-md cursor-pointer"
						onClick={playKeyAnimation}
						whileHover={{ y: 2, boxShadow: "0 2px 12px rgba(108,99,255,0.3)" }}
						whileTap={{ y: 4 }}
						initial={{ y: 60, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							delay: 1.5 + i * 0.06,
							duration: 0.5,
							ease: [0.16, 1, 0.3, 1],
						}}
					/>
					{/* Black key */}
					{key.hasBlack && (
						<motion.div
							className="piano-key absolute -right-[10px] md:-right-[12px] top-0 w-5 md:w-6 h-20 md:h-28 bg-gradient-to-b from-piano-black to-zinc-900 rounded-b-sm z-10 cursor-pointer border-x border-zinc-800"
							whileHover={{
								y: 1,
								boxShadow: "0 2px 12px rgba(108,99,255,0.4)",
							}}
							whileTap={{ y: 3 }}
							initial={{ y: 40, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{
								delay: 1.8 + i * 0.06,
								duration: 0.4,
								ease: [0.16, 1, 0.3, 1],
							}}
						/>
					)}
				</div>
			))}
		</div>
	);
}

// Floating music notes
function FloatingNotes() {
	const notes = ["♪", "♫", "♬", "♩", "𝄞"];
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{notes.map((note, i) => (
				<motion.span
					key={i}
					className="absolute text-score-accent/20 text-2xl md:text-4xl"
					style={{
						left: `${15 + i * 18}%`,
						top: `${20 + (i % 3) * 25}%`,
					}}
					animate={{
						y: [0, -30, 0],
						rotate: [0, 10, -10, 0],
						opacity: [0.15, 0.4, 0.15],
					}}
					transition={{
						duration: 4 + i * 0.8,
						repeat: Infinity,
						delay: i * 0.7,
						ease: "easeInOut",
					}}
				>
					{note}
				</motion.span>
			))}
		</div>
	);
}

export default function HeroSection() {
	const scrollDown = () => {
		const aboutEl = document.getElementById("about");
		if (aboutEl) {
			const lenis = (window as any).__lenis;
			if (lenis) {
				lenis.scrollTo(aboutEl, { duration: 1.5 });
			} else {
				aboutEl.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<section
			id="hero"
			className="relative flex flex-col items-center min-h-screen overflow-hidden bg-score-bg"
		>
			{/* Background glow */}
			<div className="absolute inset-0 bg-hero-glow" />

			{/* Particles */}
			<Particles className="absolute inset-0 -z-0" quantity={80} />

			{/* Floating music notes */}
			<FloatingNotes />

			{/* ——— Name block: pinned to upper-center ——— */}
			<div className="relative z-10 flex flex-col items-center w-full pt-[18vh] sm:pt-[20vh] md:pt-[18vh]">
				{/* Overture label */}
				<motion.div
					className="flex items-center gap-3 text-[10px] font-mono tracking-[0.5em] uppercase text-zinc-600 mb-5"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.8 }}
				>
					<span className="w-10 h-px bg-gradient-to-r from-transparent to-zinc-700" />
					Overture
					<span className="w-10 h-px bg-gradient-to-l from-transparent to-zinc-700" />
				</motion.div>

				{/* Decorative line above name */}
				<div className="hidden w-[60vw] max-w-2xl h-px md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-score-accent/30 to-zinc-300/0 mb-6" />

				{/* Name — centered and prominent */}
				<motion.h1
					className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500 text-center cursor-default leading-none"
					initial={{ opacity: 0, letterSpacing: "0.3em", scale: 0.95 }}
					animate={{ opacity: 1, letterSpacing: "0.01em", scale: 1 }}
					transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
				>
					Hudson Daniel
				</motion.h1>

				{/* Decorative line below name */}
				<div className="hidden w-[60vw] max-w-2xl h-px md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-score-accent/30 to-zinc-300/0 mt-6" />

				{/* Subtitle */}
				<motion.p
					className="mt-6 text-base md:text-lg text-zinc-500 text-center max-w-lg font-light tracking-wide"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.2, duration: 0.8 }}
				>
					Software Engineer{" "}
					<span className="text-score-accent/40">·</span> Music Producer{" "}
					<span className="text-score-accent/40">·</span> Piano Player
				</motion.p>

				{/* Tagline */}
				<motion.p
					className="mt-3 text-xs text-zinc-700 font-mono text-center tracking-wider"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.8, duration: 0.8 }}
				>
					Composing code like music — one function at a time
				</motion.p>
			</div>

			{/* Piano keyboard — pushed toward bottom */}
			<div className="relative z-10 mt-auto mb-24">
				<PianoKeyboard />
			</div>

			{/* Scroll indicator */}
			<motion.button
				className="absolute bottom-8 flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
				onClick={scrollDown}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 2.5, duration: 0.8 }}
				data-cursor="pointer"
			>
				<span className="text-[10px] font-mono tracking-[0.3em] uppercase">
					Scroll
				</span>
				<motion.div
					className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
					animate={{ scaleY: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				/>
			</motion.button>
		</section>
	);
}
