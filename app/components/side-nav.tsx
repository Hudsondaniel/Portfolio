"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, User, Zap, FolderOpen, Clock, Mail } from "lucide-react";

const sections = [
	{ id: "hero", label: "Overture", icon: Music },
	{ id: "about", label: "Story", icon: User },
	{ id: "skills", label: "Skills", icon: Zap },
	{ id: "projects", label: "Works", icon: FolderOpen },
	{ id: "timeline", label: "Journey", icon: Clock },
	{ id: "contact", label: "Contact", icon: Mail },
];

export default function SideNav() {
	const [activeSection, setActiveSection] = useState("hero");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsVisible(scrollY > 300);

			// Find active section
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i].id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= window.innerHeight / 2) {
						setActiveSection(sections[i].id);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollTo = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			const lenis = (window as any).__lenis;
			if (lenis) {
				lenis.scrollTo(el, { offset: 0, duration: 1.5 });
			} else {
				el.scrollIntoView({ behavior: "smooth" });
			}
		}
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.nav
					className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 40 }}
					transition={{ duration: 0.4, ease: "easeOut" }}
				>
					{/* Vertical staff line */}
					<div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-zinc-800" />

					{sections.map((section) => {
						const isActive = activeSection === section.id;
						const Icon = section.icon;

						return (
							<button
								key={section.id}
								onClick={() => scrollTo(section.id)}
								className="relative group flex items-center justify-center p-2"
								aria-label={`Navigate to ${section.label}`}
								data-cursor="pointer"
							>
								{/* Tooltip */}
								<span className="absolute right-full mr-3 px-2 py-1 text-xs font-mono rounded bg-score-surface border border-zinc-800 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
									{section.label}
								</span>

								{/* Dot / Icon */}
								<motion.div
									className={`relative z-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
										isActive
											? "w-9 h-9 bg-score-accent/20 border border-score-accent"
											: "w-7 h-7 bg-score-surface border border-zinc-700 hover:border-zinc-500"
									}`}
									layout
									transition={{ type: "spring", stiffness: 300, damping: 25 }}
								>
									{isActive ? (
										<Icon className="w-3.5 h-3.5 text-score-accent" />
									) : (
										<div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-zinc-400 transition-colors" />
									)}
								</motion.div>
							</button>
						);
					})}
				</motion.nav>
			)}
		</AnimatePresence>
	);
}
