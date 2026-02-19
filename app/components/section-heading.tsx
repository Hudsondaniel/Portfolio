"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
	title: string;
	subtitle?: string;
	accent?: string;
	align?: "left" | "center";
}

export default function SectionHeading({
	title,
	subtitle,
	accent,
	align = "left",
}: SectionHeadingProps) {
	return (
		<div className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
			{accent && (
				<motion.span
					className="inline-block text-sm font-mono tracking-[0.3em] uppercase text-score-accent mb-4"
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					♪ {accent}
				</motion.span>
			)}
			<motion.h2
				className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.1 }}
			>
				{title}
			</motion.h2>
			{subtitle && (
				<motion.p
					className="mt-4 text-lg text-zinc-400 max-w-2xl"
					initial={{ opacity: 0, y: 15 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2 }}
					style={align === "center" ? { margin: "1rem auto 0" } : undefined}
				>
					{subtitle}
				</motion.p>
			)}
		</div>
	);
}
