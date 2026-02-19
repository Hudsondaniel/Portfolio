import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { getAllProjects } from "../../lib/mdx";
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
	SiGnubash,
	SiBlender,
	SiMicroeditor,
	SiGreensock,
	SiWebpack,
	SiGoogle,
	SiNextdotjs,
	SiTailwindcss,
	SiVite,
} from "react-icons/si";

const techIconMap: Record<string, JSX.Element> = {
	react: <FaReact className="w-6 h-6 text-cyan-400" title="React" />,
	threejs: <SiThreedotjs className="w-6 h-6 text-white" title="Three.js" />,
	typescript: (
		<SiTypescript className="w-6 h-6 text-blue-500" title="TypeScript" />
	),
	javascript: <FaJs className="w-6 h-6 text-yellow-400" title="JavaScript" />,
	nodejs: <FaNodeJs className="w-6 h-6 text-green-600" title="Node.js" />,
	monaco: <SiMicroeditor className="w-6 h-6 text-blue-400" title="Monaco" />,
	gsap: <SiGreensock className="w-6 h-6 text-green-500" title="GSAP" />,
	zustand: <FaDatabase className="w-6 h-6 text-zinc-400" title="Zustand" />,
	express: <SiExpress className="w-6 h-6 text-gray-400" title="Express" />,
	blender: <SiBlender className="w-6 h-6 text-orange-500" title="Blender" />,
	webpack: <SiWebpack className="w-6 h-6 text-blue-500" title="Webpack" />,
	css: <FaCss3Alt className="w-6 h-6 text-blue-400" title="CSS" />,
	html: <FaHtml5 className="w-6 h-6 text-orange-500" title="HTML" />,
	google: <SiGoogle className="w-6 h-6 text-blue-500" title="Google" />,
	nextjs: <SiNextdotjs className="w-6 h-6 text-white" title="Next.js" />,
	tailwind: (
		<SiTailwindcss className="w-6 h-6 text-cyan-400" title="Tailwind CSS" />
	),
	vite: <SiVite className="w-6 h-6 text-purple-500" title="Vite" />,
};

export const revalidate = 60;
export default async function ProjectsPage() {
	const allProjects = getAllProjects();

	// Get featured projects, falling back to the first available project if not found
	const featured =
		allProjects.find((project) => project.slug === "sketchcode") ||
		allProjects[0];
	const top2 =
		allProjects.find((project) => project.slug === "skynet") || allProjects[1];
	const top3 =
		allProjects.find((project) => project.slug === "cv-generator") ||
		allProjects[2];
	const top4 =
		allProjects.find((project) => project.slug === "portfolio") ||
		allProjects[3];

	// Only proceed if we have at least one project
	if (!featured) {
		return (
			<div className="relative pb-16">
				<Navigation />
				<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
					<div className="max-w-2xl mx-auto lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
							Projects
						</h2>
						<p className="mt-4 text-zinc-400">
							No projects available at the moment.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const sorted = allProjects
		.filter((p) => p.published)
		.filter(
			(project) =>
				project.slug !== featured?.slug &&
				project.slug !== top2?.slug &&
				project.slug !== top3?.slug &&
				project.slug !== top4?.slug,
		)
		.sort(
			(a, b) =>
				new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
				new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
		);

	return (
		<div className="relative pb-16 bg-score-bg">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
						♪ All Tracks
					</h2>
					<p className="mt-4 text-zinc-400">
						Thank you for checking out my projects!
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
					<Card>
						<Link href={`/projects/${featured.slug}`}>
							<article className="relative w-full h-full p-4 md:p-8">
								<div className="flex items-center justify-between gap-2">
									<div className="text-xs text-zinc-100">
										{featured.date ? (
											<time dateTime={new Date(featured.date).toISOString()}>
												{Intl.DateTimeFormat(undefined, {
													dateStyle: "medium",
												}).format(new Date(featured.date))}
											</time>
										) : (
											<span>SOON</span>
										)}
									</div>
								</div>

								<h2
									id="featured-post"
									className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
								>
									{featured.title}
								</h2>
								<p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
									{featured.description}
								</p>
								<div className="flex flex-wrap gap-2 mt-4">
									{featured.techStack?.map((tech: string) => {
										const icon = techIconMap[tech.toLowerCase()];
										return (
											icon || (
												<FaDatabase
													className="w-6 h-6 text-zinc-400"
													title={tech}
													key={tech}
												/>
											)
										);
									})}
								</div>
								<div className="absolute bottom-4 md:bottom-8">
									<p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
										Read more <span aria-hidden="true">&rarr;</span>
									</p>
								</div>
							</article>
						</Link>
					</Card>

					<div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
						{[top2, top3].filter(Boolean).map((project) => (
							<Card key={project.slug}>
								<Article project={project} />
							</Card>
						))}
					</div>
				</div>

				<div className="mx-auto mt-8">
					{top4 && (
						<Card>
							<Article project={top4} />
						</Card>
					)}
				</div>

				<div className="hidden w-full h-px md:block bg-zinc-800" />

				<div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 0)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 1)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
					<div className="grid grid-cols-1 gap-4">
						{sorted
							.filter((_, i) => i % 3 === 2)
							.map((project) => (
								<Card key={project.slug}>
									<Article project={project} />
								</Card>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
