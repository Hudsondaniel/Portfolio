"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../scroll-reveal";
import SectionHeading from "../section-heading";

interface Skill {
	name: string;
	level: number; // 0-100
	color: string;
}

interface SkillCategory {
	title: string;
	icon: string;
	skills: Skill[];
}

const skillCategories: SkillCategory[] = [
	{
		title: "Frontend",
		icon: "🎨",
		skills: [
			{ name: "React / Next.js", level: 92, color: "#61dafb" },
			{ name: "TypeScript", level: 88, color: "#3178c6" },
			{ name: "Three.js / WebGL", level: 78, color: "#ffffff" },
			{ name: "Tailwind CSS", level: 90, color: "#06b6d4" },
			{ name: "Framer Motion", level: 85, color: "#e84393" },
		],
	},
	{
		title: "Backend",
		icon: "⚙️",
		skills: [
			{ name: "Node.js", level: 85, color: "#68a063" },
			{ name: "Express", level: 82, color: "#ffffff" },
			{ name: "REST APIs", level: 88, color: "#6c63ff" },
			{ name: "Databases", level: 75, color: "#d4a853" },
			{ name: "Authentication", level: 78, color: "#00cec9" },
		],
	},
	{
		title: "Tools & Creative",
		icon: "🛠",
		skills: [
			{ name: "Git / GitHub", level: 90, color: "#f05032" },
			{ name: "Music Production", level: 88, color: "#e84393" },
			{ name: "Piano", level: 85, color: "#d4a853" },
			{ name: "Blender / 3D", level: 65, color: "#ea7600" },
			{ name: "UI/UX Design", level: 80, color: "#6c63ff" },
		],
	},
];

// Single equalizer bar
function EqualizerBar({
	skill,
	index,
	categoryIndex,
}: {
	skill: Skill;
	index: number;
	categoryIndex: number;
}) {
	return (
		<motion.div
			className="group relative flex items-end gap-3 cursor-default"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{
				delay: categoryIndex * 0.2 + index * 0.08,
				duration: 0.5,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{/* Label */}
			<div className="w-28 md:w-36 flex-shrink-0 text-right">
				<span className="text-xs md:text-sm text-zinc-400 group-hover:text-white transition-colors duration-300 font-mono">
					{skill.name}
				</span>
			</div>

			{/* Bar track */}
			<div className="flex-1 h-8 md:h-10 relative bg-score-surface rounded-sm overflow-hidden border border-zinc-800/50">
				{/* Fill */}
				<motion.div
					className="absolute inset-y-0 left-0 rounded-sm"
					style={{
						background: `linear-gradient(90deg, ${skill.color}20, ${skill.color}60)`,
					}}
					initial={{ width: 0 }}
					whileInView={{ width: `${skill.level}%` }}
					viewport={{ once: true }}
					transition={{
						delay: categoryIndex * 0.2 + index * 0.1 + 0.3,
						duration: 1,
						ease: [0.16, 1, 0.3, 1],
					}}
				/>

				{/* Glow at the edge */}
				<motion.div
					className="absolute inset-y-0 w-1 rounded-full"
					style={{
						background: skill.color,
						boxShadow: `0 0 12px ${skill.color}80, 0 0 4px ${skill.color}`,
					}}
					initial={{ left: 0, opacity: 0 }}
					whileInView={{ left: `${skill.level}%`, opacity: 1 }}
					viewport={{ once: true }}
					transition={{
						delay: categoryIndex * 0.2 + index * 0.1 + 0.3,
						duration: 1,
						ease: [0.16, 1, 0.3, 1],
					}}
				/>

				{/* Percentage */}
				<motion.span
					className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 0 }}
					whileHover={{ opacity: 1 }}
				>
					{skill.level}%
				</motion.span>

				{/* Grid lines (like a mixing board) */}
				<div className="absolute inset-0 flex">
					{Array.from({ length: 10 }).map((_, i) => (
						<div
							key={i}
							className="flex-1 border-r border-zinc-800/30 last:border-0"
						/>
					))}
				</div>
			</div>
		</motion.div>
	);
}

// Animated "mixing board" background
function MixerGrid() {
	return (
		<div className="absolute inset-0 opacity-[0.03] pointer-events-none">
			<div className="w-full h-full grid grid-cols-12 gap-[1px]">
				{Array.from({ length: 48 }).map((_, i) => (
					<div key={i} className="bg-score-accent" />
				))}
			</div>
		</div>
	);
}

export default function SkillsSection() {
	return (
		<section
			id="skills"
			className="relative py-32 md:py-40 bg-score-bg overflow-hidden"
		>
			<MixerGrid />

			<div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
				<SectionHeading
					accent="Skills"
					title="The Mixing Board"
					subtitle="Every skill is a frequency — turn the levels up and listen to the mix."
				/>

				<div className="space-y-16">
					{skillCategories.map((category, catIdx) => (
						<ScrollReveal key={category.title} delay={catIdx * 0.15}>
							<div>
								{/* Category header */}
								<div className="flex items-center gap-3 mb-6">
									<span className="text-xl">{category.icon}</span>
									<h3 className="text-lg font-display font-bold text-zinc-200">
										{category.title}
									</h3>
									<div className="flex-1 h-px bg-zinc-800" />
								</div>

								{/* Equalizer bars */}
								<div className="space-y-3">
									{category.skills.map((skill, skillIdx) => (
										<EqualizerBar
											key={skill.name}
											skill={skill}
											index={skillIdx}
											categoryIndex={catIdx}
										/>
									))}
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>
			</div>
		</section>
	);
}
