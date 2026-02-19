import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { getProjectBySlug, getProjectSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export const revalidate = 60;

type Props = {
	params: {
		slug: string;
	};
};

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

	return (
		<div className="bg-score-bg min-h-screen">
			<Header project={project} />

			<article className="px-4 py-12 mx-auto prose prose-invert prose-quoteless">
				<MDXRemote source={project.content} />
			</article>
		</div>
	);
}
