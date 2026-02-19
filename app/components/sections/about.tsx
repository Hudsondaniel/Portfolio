"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../scroll-reveal";
import SectionHeading from "../section-heading";

const storyChapters = [
	{
		emoji: "🎹",
		title: "The First Note",
		text: "My journey began at the piano — learning to listen, to feel rhythm, and to create something from nothing. Those early melodies taught me patience, structure, and the beauty of building complexity from simplicity.",
	},
	{
		emoji: "🎧",
		title: "The Beat Drops",
		text: "Music production opened a new world — DAWs became my first IDE, synth patches my first algorithms. I learned that great compositions and great code share the same DNA: layers, patterns, and the courage to experiment.",
	},
	{
		emoji: "💻",
		title: "The Code Compiles",
		text: "When I discovered programming, it felt like coming home. The same creative fire that drove me to compose music now powers my code. I build software the way I build tracks — iteratively, obsessively, and with soul.",
	},
	{
		emoji: "🚀",
		title: "The Symphony Continues",
		text: "Today, I fuse these worlds. Whether it's crafting 3D web experiences, architecting scalable systems, or producing beats at midnight — every project is a movement in my ever-evolving symphony.",
	},
];

// Waveform visualization that appears behind the text
function WaveformBg() {
	return (
		<div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none overflow-hidden">
			<div className="flex items-center gap-[3px] h-full">
				{Array.from({ length: 80 }).map((_, i) => (
					<motion.div
						key={i}
						className="w-[2px] bg-score-accent rounded-full"
						style={{
							height: `${20 + Math.sin(i * 0.3) * 30 + Math.random() * 20}%`,
						}}
						animate={{
							scaleY: [0.5, 1, 0.7, 1, 0.5],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: i * 0.05,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>
		</div>
	);
}

export default function AboutSection() {
	return (
		<section
			id="about"
			className="relative py-32 md:py-40 bg-score-bg overflow-hidden"
		>
			<WaveformBg />

			<div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
				<SectionHeading
					accent="About Me"
					title="Where Music Meets Code"
					subtitle="Every great program has a rhythm. Here's the story of how I found mine."
				/>

				{/* Story chapters */}
				<div className="grid gap-12 md:gap-16">
					{storyChapters.map((chapter, i) => (
						<ScrollReveal
							key={chapter.title}
							delay={i * 0.15}
							direction={i % 2 === 0 ? "left" : "right"}
						>
							<div className="group relative flex items-start gap-6 md:gap-8 p-6 md:p-8 rounded-2xl glass hover:border-score-accent/20 transition-all duration-500">
								{/* Chapter number / note */}
								<div className="flex-shrink-0 flex flex-col items-center gap-2">
									<span className="text-3xl">{chapter.emoji}</span>
									<span className="text-xs font-mono text-zinc-600">
										0{i + 1}
									</span>
								</div>

								{/* Content */}
								<div>
									<h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-score-accent transition-colors duration-300">
										{chapter.title}
									</h3>
									<p className="text-zinc-400 leading-relaxed text-sm md:text-base">
										{chapter.text}
									</p>
								</div>

								{/* Connecting line to next chapter */}
								{i < storyChapters.length - 1 && (
									<div className="absolute -bottom-8 left-[42px] md:left-[46px] w-px h-8 bg-gradient-to-b from-zinc-800 to-transparent" />
								)}
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* Fun facts */}
				<ScrollReveal delay={0.4} className="mt-20">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{[
							{ value: "∞", label: "Lines of Code" },
							{ value: "88", label: "Piano Keys Mastered" },
							{ value: "24/7", label: "Creative Mode" },
							{ value: "1", label: "Passion: Building" },
						].map((stat) => (
							<div
								key={stat.label}
								className="text-center p-6 rounded-xl glass"
							>
								<div className="text-2xl md:text-3xl font-display font-bold gradient-text mb-2">
									{stat.value}
								</div>
								<div className="text-xs text-zinc-500 font-mono">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
