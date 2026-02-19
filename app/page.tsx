import dynamic from "next/dynamic";

// Lazy-load heavy sections for performance
const HeroSection = dynamic(
	() => import("./components/sections/hero"),
	{ ssr: true }
);
const AboutSection = dynamic(
	() => import("./components/sections/about"),
	{ ssr: true }
);
const SkillsSection = dynamic(
	() => import("./components/sections/skills"),
	{ ssr: true }
);
const ProjectsSection = dynamic(
	() => import("./components/sections/projects"),
	{ ssr: true }
);
const TimelineSection = dynamic(
	() => import("./components/sections/timeline"),
	{ ssr: true }
);
const ContactSection = dynamic(
	() => import("./components/sections/contact"),
	{ ssr: true }
);

const TopNav = dynamic(() => import("./components/top-nav"), { ssr: false });
const SideNav = dynamic(() => import("./components/side-nav"), { ssr: false });
const CustomCursor = dynamic(
	() => import("./components/custom-cursor"),
	{ ssr: false }
);
const SectionDivider = dynamic(
	() => import("./components/section-divider"),
	{ ssr: false }
);

export default function Home() {
	return (
		<main className="bg-score-bg noise">
			{/* Navigation */}
			<TopNav />
			<SideNav />

			{/* Custom cursor */}
			<CustomCursor />

			{/* Sections */}
			<HeroSection />
			<SectionDivider variant="waveform" />
			<AboutSection />
			<SectionDivider variant="staff" />
			<SkillsSection />
			<SectionDivider variant="fade" />
			<ProjectsSection />
			<SectionDivider variant="waveform" />
			<TimelineSection />
			<SectionDivider variant="staff" />
			<ContactSection />
		</main>
	);
}
