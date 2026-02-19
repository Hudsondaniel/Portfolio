"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "../scroll-reveal";
import SectionHeading from "../section-heading";
import {
	FaReact,
	FaNodeJs,
	FaJs,
	FaDatabase,
	FaHtml5,
	FaCss3Alt,
} from "react-icons/fa";
import {
	SiThreedotjs,
	SiTypescript,
	SiExpress,
	SiGreensock,
	SiWebpack,
	SiNextdotjs,
	SiTailwindcss,
	SiVite,
} from "react-icons/si";
import { ExternalLink, Github } from "lucide-react";

const techIconMap: Record<string, JSX.Element> = {
	react: <FaReact className="w-4 h-4 text-cyan-400" />,
	threejs: <SiThreedotjs className="w-4 h-4 text-white" />,
	typescript: <SiTypescript className="w-4 h-4 text-blue-500" />,
	javascript: <FaJs className="w-4 h-4 text-yellow-400" />,
	nodejs: <FaNodeJs className="w-4 h-4 text-green-500" />,
	gsap: <SiGreensock className="w-4 h-4 text-green-500" />,
	zustand: <FaDatabase className="w-4 h-4 text-zinc-400" />,
	express: <SiExpress className="w-4 h-4 text-gray-400" />,
	webpack: <SiWebpack className="w-4 h-4 text-blue-500" />,
	css: <FaCss3Alt className="w-4 h-4 text-blue-400" />,
	html: <FaHtml5 className="w-4 h-4 text-orange-500" />,
	nextjs: <SiNextdotjs className="w-4 h-4 text-white" />,
	tailwind: <SiTailwindcss className="w-4 h-4 text-cyan-400" />,
	vite: <SiVite className="w-4 h-4 text-purple-500" />,
};

interface Project {
	title: string;
	description: string;
	slug: string;
	url?: string;
	repository?: string;
	techStack: string[];
	featured?: boolean;
	image?: string;
}

const projects: Project[] = [
	{
		title: "SketchCode",
		description:
			"A 3D web app that visualizes data structures and competitive programming in real time using Three.js, Generative AI, and React.",
		slug: "sketchcode",
		url: "https://sketch-code.vercel.app/",
		repository: "Hudsondaniel/SketchCode",
		techStack: ["react", "threejs", "typescript", "nodejs", "gsap", "zustand"],
		featured: true,
		image: "/Project-Pics/Sketchcode-snap.png",
	},
	{
		title: "Skynet",
		description:
			"A full-stack social network platform with real-time features, authentication, and interactive UI.",
		slug: "skynet",
		repository: "Hudsondaniel/Skynet",
		techStack: ["react", "nodejs", "express", "javascript"],
		featured: true,
	},
	{
		title: "CV Generator",
		description:
			"Elegant resume builder with live preview, export to PDF, and customizable templates.",
		slug: "cv-generator",
		repository: "Hudsondaniel/cv-generator",
		techStack: ["react", "javascript", "css"],
	},
	{
		title: "Portfolio",
		description:
			"This very site — an immersive music-themed portfolio built with Next.js, Three.js and Framer Motion.",
		slug: "portfolio",
		url: "https://portfolio-hudson.vercel.app",
		techStack: ["nextjs", "typescript", "tailwind"],
	},
	{
		title: "Dashboard",
		description:
			"An analytics dashboard with interactive charts and data visualization.",
		slug: "dashboard",
		techStack: ["react", "javascript", "css"],
	},
	{
		title: "Shopping Cart",
		description:
			"E-commerce frontend with cart management, product filtering and responsive design.",
		slug: "shopping-cart",
		techStack: ["react", "javascript", "css"],
	},
];

// Vinyl record style card
function VinylProjectCard({
	project,
	index,
}: {
	project: Project;
	index: number;
}) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<ScrollReveal delay={index * 0.1} direction="up">
			<motion.div
				className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
					project.featured
						? "md:col-span-2 md:row-span-2"
						: ""
				}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={{ y: -4 }}
				transition={{ duration: 0.3 }}
				data-cursor="pointer"
			>
				{/* Background */}
				<div className="absolute inset-0 bg-score-surface border border-zinc-800/60 rounded-2xl group-hover:border-score-accent/30 transition-colors duration-500" />

				{/* Content */}
				<div className="relative p-6 md:p-8 h-full flex flex-col justify-between min-h-[240px]">
					{/* Top section */}
					<div>
						{/* Track number + featured badge */}
						<div className="flex items-center justify-between mb-4">
							<span className="text-xs font-mono text-zinc-600">
								Track {String(index + 1).padStart(2, "0")}
							</span>
							{project.featured && (
								<span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-score-accent/10 text-score-accent border border-score-accent/20">
									Featured
								</span>
							)}
						</div>

						{/* Title */}
						<h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-score-accent transition-colors duration-300">
							{project.title}
						</h3>

						{/* Description */}
						<p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
							{project.description}
						</p>
					</div>

					{/* Bottom section */}
					<div className="mt-6">
						{/* Tech stack */}
						<div className="flex flex-wrap gap-2 mb-4">
							{project.techStack.map((tech) => (
								<div
									key={tech}
									className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 text-xs text-zinc-400"
								>
									{techIconMap[tech.toLowerCase()]}
									<span className="hidden sm:inline capitalize">{tech}</span>
								</div>
							))}
						</div>

						{/* Links */}
						<div className="flex items-center gap-4">
							{project.url && (
								<Link
									href={project.url}
									target="_blank"
									className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-score-accent transition-colors"
								>
									<ExternalLink className="w-3.5 h-3.5" />
									Live
								</Link>
							)}
							{project.repository && (
								<Link
									href={`https://github.com/${project.repository}`}
									target="_blank"
									className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
								>
									<Github className="w-3.5 h-3.5" />
									Code
								</Link>
							)}
							<Link
								href={`/projects/${project.slug}`}
								className="ml-auto text-xs font-mono text-zinc-500 hover:text-score-accent transition-colors"
							>
								Read more →
							</Link>
						</div>
					</div>

					{/* Vinyl record decoration (on hover) */}
					<AnimatePresence>
						{isHovered && project.featured && (
							<motion.div
								className="absolute -right-10 -bottom-10 w-32 h-32 md:w-40 md:h-40 pointer-events-none"
								initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
								animate={{ opacity: 0.15, rotate: 360, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{
									opacity: { duration: 0.3 },
									rotate: { duration: 8, repeat: Infinity, ease: "linear" },
								}}
							>
								<div className="w-full h-full rounded-full bg-zinc-800 vinyl-groove flex items-center justify-center">
									<div className="w-1/3 h-1/3 rounded-full bg-score-accent/20" />
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Hover glow */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-t from-score-accent/5 to-transparent" />
				</div>
			</motion.div>
		</ScrollReveal>
	);
}

export default function ProjectsSection() {
	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	return (
		<section
			id="projects"
			className="relative py-32 md:py-40 bg-score-bg overflow-hidden"
		>
			<div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
				<SectionHeading
					accent="Projects"
					title="The Album"
					subtitle="Each project is a track — a unique composition of technology, creativity, and problem-solving."
				/>

				{/* Featured projects */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					{featured.map((project, i) => (
						<VinylProjectCard key={project.slug} project={project} index={i} />
					))}
				</div>

				{/* Other projects */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{rest.map((project, i) => (
						<VinylProjectCard
							key={project.slug}
							project={project}
							index={i + featured.length}
						/>
					))}
				</div>

				{/* View all link */}
				<ScrollReveal delay={0.3} className="mt-12 text-center">
					<Link
						href="/projects"
						className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-score-accent transition-colors duration-300 group"
						data-cursor="pointer"
					>
						<span>View all tracks</span>
						<span className="group-hover:translate-x-1 transition-transform">
							→
						</span>
					</Link>
				</ScrollReveal>
			</div>
		</section>
	);
}
