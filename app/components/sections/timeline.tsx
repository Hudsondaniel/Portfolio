"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../scroll-reveal";
import SectionHeading from "../section-heading";

interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	type: "music" | "tech" | "milestone";
	icon: string;
}

const events: TimelineEvent[] = [
	{
		year: "Early Days",
		title: "First Piano Lesson",
		description:
			"Sat at a piano for the first time and played my first chord. The magic of creating sound from touch was unforgettable.",
		type: "music",
		icon: "🎹",
	},
	{
		year: "The Spark",
		title: "Music Production Begins",
		description:
			"Discovered DAWs and started producing beats. Learned about synthesis, mixing, and the art of sound design.",
		type: "music",
		icon: "🎧",
	},
	{
		year: "Transition",
		title: "Discovered Programming",
		description:
			"Wrote my first line of code and realized that creating software felt just like composing music — building layers, patterns, and experiences.",
		type: "tech",
		icon: "💡",
	},
	{
		year: "Growth",
		title: "Deep Dive into Web Dev",
		description:
			"Fell in love with React, Node.js, and the art of building interactive experiences on the web.",
		type: "tech",
		icon: "⚛️",
	},
	{
		year: "Creation",
		title: "Built SketchCode",
		description:
			"Combined my love for 3D graphics and education to build a platform that visualizes data structures in real time.",
		type: "milestone",
		icon: "🚀",
	},
	{
		year: "Now",
		title: "The Symphony Continues",
		description:
			"Building the future — one commit at a time, one beat at a time. The best movements are still being composed.",
		type: "milestone",
		icon: "✨",
	},
];

const typeColors = {
	music: "border-score-rose text-score-rose bg-score-rose/10",
	tech: "border-score-accent text-score-accent bg-score-accent/10",
	milestone: "border-score-gold text-score-gold bg-score-gold/10",
};

const typeLineColors = {
	music: "from-score-rose/40",
	tech: "from-score-accent/40",
	milestone: "from-score-gold/40",
};

// Musical staff lines in background
function StaffBackground() {
	return (
		<div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
			<div className="w-full">
				{[0, 1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className="w-full h-px bg-zinc-800/40"
						style={{ marginBottom: i < 4 ? "24px" : 0 }}
					/>
				))}
			</div>
		</div>
	);
}

export default function TimelineSection() {
	return (
		<section
			id="timeline"
			className="relative py-32 md:py-40 bg-score-bg overflow-hidden"
		>
			<StaffBackground />

			<div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
				<SectionHeading
					accent="Journey"
					title="The Score"
					subtitle="Life is a musical score — each event a note, each chapter a movement."
					align="center"
				/>

				{/* Timeline */}
				<div className="relative">
					{/* Center line */}
					<div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

					{events.map((event, i) => {
						const isLeft = i % 2 === 0;

						return (
							<ScrollReveal
								key={event.title}
								delay={i * 0.1}
								direction={isLeft ? "left" : "right"}
								className="mb-12 last:mb-0"
							>
								<div
									className={`relative flex items-start gap-6 md:gap-0 ${
										isLeft
											? "md:flex-row"
											: "md:flex-row-reverse"
									}`}
								>
									{/* Content card */}
									<div
										className={`flex-1 ml-12 md:ml-0 ${
											isLeft ? "md:pr-12" : "md:pl-12"
										}`}
									>
										<div className="group p-5 md:p-6 rounded-xl glass hover:border-zinc-700 transition-all duration-500">
											{/* Year badge */}
											<div className="flex items-center gap-2 mb-3">
												<span
													className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border ${
														typeColors[event.type]
													}`}
												>
													{event.type}
												</span>
												<span className="text-xs font-mono text-zinc-600">
													{event.year}
												</span>
											</div>

											{/* Title */}
											<h3 className="text-lg md:text-xl font-display font-bold text-white mb-2 group-hover:gradient-text transition-all duration-300">
												{event.title}
											</h3>

											{/* Description */}
											<p className="text-sm text-zinc-400 leading-relaxed">
												{event.description}
											</p>
										</div>
									</div>

									{/* Timeline node */}
									<div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex-shrink-0">
										<motion.div
											className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 ${
												typeColors[event.type]
											} bg-score-bg`}
											whileInView={{ scale: [0.5, 1.1, 1] }}
											viewport={{ once: true }}
											transition={{
												delay: i * 0.1 + 0.2,
												duration: 0.5,
												ease: [0.16, 1, 0.3, 1],
											}}
										>
											{event.icon}
										</motion.div>
									</div>

									{/* Spacer for the other side (desktop) */}
									<div className="hidden md:block flex-1" />
								</div>
							</ScrollReveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
