export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-blue-950 via-blue-800/20 to-blue-950 ">
			{children}
		</div>
	);
}
