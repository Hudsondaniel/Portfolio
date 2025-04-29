import type { Project } from "@/types/project";
import Link from "next/link";
import { Eye } from "lucide-react";
import Image from "next/image";
import {
	FaReact,
	FaNodeJs,
	FaJs,
	FaGithub,
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

type Props = {
	project: Project;
	views: number;
};

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

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="p-4 md:p-8">
				<div className="flex justify-between gap-2 items-center">
					<span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange">
						{project.date ? (
							<time dateTime={new Date(project.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(project.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display">
					{project.title}
				</h2>
				<p className="z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-2 mt-4">
					{project.techStack?.map((tech) => {
						const icon = techIconMap[tech.toLowerCase()];
						return icon ? (
							<div key={tech}>{icon}</div>
						) : (
							<FaDatabase
								className="w-6 h-6 text-zinc-400"
								title={tech}
								key={tech}
							/>
						);
					})}
				</div>
			</article>
		</Link>
	);
};
