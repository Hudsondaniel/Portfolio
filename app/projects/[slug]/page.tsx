import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
	const slugs = getProjectSlugs();
	return slugs.map((slug) => ({
		slug,
	}));
}

export default async function PostPage({ params }: Props) {
	const slug = params?.slug;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	const views =
		(await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

	return (
		<div className="bg-zinc-50 min-h-screen">
			<Header project={project} views={views} />
			<ReportView slug={project.slug} />

			<article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
				<MDXRemote source={project.content} />
			</article>
		</div>
	);
}
