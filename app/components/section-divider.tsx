"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
	variant?: "waveform" | "staff" | "fade";
}

export default function SectionDivider({
	variant = "waveform",
}: SectionDividerProps) {
	if (variant === "fade") {
		return (
			<div className="relative h-24 md:h-32 bg-score-bg">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-score-accent/[0.02] to-transparent" />
			</div>
		);
	}

	if (variant === "staff") {
		return (
			<div className="relative h-16 bg-score-bg flex items-center overflow-hidden">
				<div className="w-full flex flex-col gap-[6px] opacity-10">
					{[0, 1, 2, 3, 4].map((i) => (
						<div key={i} className="w-full h-px bg-score-accent" />
					))}
				</div>
				{/* Treble clef decoration */}
				<motion.span
					className="absolute left-8 text-2xl text-score-accent/10"
					animate={{ x: [0, 10, 0] }}
					transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				>
					𝄞
				</motion.span>
			</div>
		);
	}

	// Waveform variant
	return (
		<div className="relative h-16 bg-score-bg flex items-center justify-center overflow-hidden">
			<div className="flex items-center gap-[2px] h-8 opacity-10">
				{Array.from({ length: 60 }).map((_, i) => (
					<motion.div
						key={i}
						className="w-[2px] bg-score-accent rounded-full"
						animate={{
							height: [
								`${4 + Math.sin(i * 0.5) * 12}px`,
								`${4 + Math.cos(i * 0.3) * 16}px`,
								`${4 + Math.sin(i * 0.5) * 12}px`,
							],
						}}
						transition={{
							duration: 2 + Math.random(),
							repeat: Infinity,
							delay: i * 0.03,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>
		</div>
	);
}
