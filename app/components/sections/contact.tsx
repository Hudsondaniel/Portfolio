"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import ScrollReveal from "../scroll-reveal";
import SectionHeading from "../section-heading";
import MagneticButton from "../magnetic-button";

const socials = [
	{
		icon: Linkedin,
		href: "https://www.linkedin.com/in/hudson--daniel/",
		label: "LinkedIn",
		handle: "@hudson-daniel",
		color: "#0077b5",
	},
	{
		icon: Mail,
		href: "mailto:hudsondaniel321@gmail.com",
		label: "Email",
		handle: "hudsondaniel321@gmail.com",
		color: "#e84393",
	},
	{
		icon: Github,
		href: "https://github.com/Hudsondaniel",
		label: "GitHub",
		handle: "Hudsondaniel",
		color: "#ffffff",
	},
];

// Audio waveform decoration
function ContactWaveform() {
	return (
		<div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-[2px] opacity-[0.06] pointer-events-none overflow-hidden">
			{Array.from({ length: 100 }).map((_, i) => {
				const h = 10 + Math.sin(i * 0.15) * 50 + Math.random() * 30;
				return (
					<motion.div
						key={i}
						className="w-[3px] bg-score-accent rounded-t-full"
						style={{ height: `${h}%` }}
						animate={{
							scaleY: [0.6, 1, 0.8, 1, 0.6],
						}}
						transition={{
							duration: 2 + Math.random(),
							repeat: Infinity,
							delay: i * 0.02,
							ease: "easeInOut",
						}}
					/>
				);
			})}
		</div>
	);
}

export default function ContactSection() {
	return (
		<section
			id="contact"
			className="relative py-32 md:py-40 bg-score-bg overflow-hidden"
		>
			<ContactWaveform />

			<div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
				<SectionHeading
					accent="Contact"
					title="The Encore"
					subtitle="Every great performance deserves an encore. Let's create something extraordinary together."
					align="center"
				/>

				{/* Main CTA */}
				<ScrollReveal delay={0.1} className="text-center mb-16">
					<motion.p
						className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-8"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						Whether you have a project in mind, want to collaborate, or just
						want to talk about music and code — I'd love to hear from you.
					</motion.p>

					<MagneticButton strength={20}>
						<Link
							href="mailto:hudsondaniel321@gmail.com"
							className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-score-accent text-white font-display font-bold text-lg hover:bg-score-accent/90 transition-colors duration-300 glow"
						>
							<Mail className="w-5 h-5" />
							Let's Talk
							<ExternalLink className="w-4 h-4 opacity-60" />
						</Link>
					</MagneticButton>
				</ScrollReveal>

				{/* Social cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{socials.map((social, i) => {
						const Icon = social.icon;
						return (
							<ScrollReveal key={social.label} delay={0.2 + i * 0.1}>
								<Link
									href={social.href}
									target="_blank"
									className="group relative block p-6 rounded-xl glass hover:border-zinc-600 transition-all duration-500"
									data-cursor="pointer"
								>
									{/* Icon */}
									<div
										className="w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
										style={{
											backgroundColor: `${social.color}15`,
											border: `1px solid ${social.color}30`,
										}}
									>
										<Icon
											className="w-4 h-4 transition-colors duration-300"
											style={{ color: social.color }}
										/>
									</div>

									{/* Label */}
									<h3 className="text-sm font-display font-bold text-white mb-1">
										{social.label}
									</h3>
									<p className="text-xs text-zinc-500 font-mono group-hover:text-zinc-400 transition-colors truncate">
										{social.handle}
									</p>

									{/* Hover arrow */}
									<motion.div
										className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										whileHover={{ x: 2 }}
									>
										<ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
									</motion.div>

									{/* Glow */}
									<div
										className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
										style={{
											background: `radial-gradient(circle at 30% 30%, ${social.color}08, transparent 60%)`,
										}}
									/>
								</Link>
							</ScrollReveal>
						);
					})}
				</div>

				{/* Footer */}
				<ScrollReveal delay={0.4} className="mt-20 pt-8 border-t border-zinc-800/50">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-mono">
						<p>
							Composed with ♪ by Hudson Daniel ·{" "}
							{new Date().getFullYear()}
						</p>
						<p>
							Built with Next.js · Three.js · Framer Motion · Tailwind CSS
						</p>
					</div>
				</ScrollReveal>
			</div>
		</section>
	);
}
