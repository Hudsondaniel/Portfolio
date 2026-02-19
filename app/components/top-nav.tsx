"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Music } from "lucide-react";

const navLinks = [
	{ id: "about", label: "About" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
	{ id: "timeline", label: "Journey" },
	{ id: "contact", label: "Contact" },
];

export default function TopNav() {
	const [isVisible, setIsVisible] = useState(false);
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 400);

			const sections = navLinks.map((l) => l.id);
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = document.getElementById(sections[i]);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= window.innerHeight / 3) {
						setActiveSection(sections[i]);
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
				<motion.header
					className="fixed top-0 inset-x-0 z-50"
					initial={{ y: -80, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -80, opacity: 0 }}
					transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
				>
					<div className="glass border-b border-zinc-800/50">
						<nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
							{/* Logo / Home */}
							<button
								onClick={() => scrollTo("hero")}
								className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
								data-cursor="pointer"
							>
								<Music className="w-4 h-4 text-score-accent" />
								<span className="text-sm font-display font-bold">HD</span>
							</button>

							{/* Nav links */}
							<div className="hidden md:flex items-center gap-1">
								{navLinks.map((link) => (
									<button
										key={link.id}
										onClick={() => scrollTo(link.id)}
										className={`relative px-3 py-1.5 text-xs font-mono transition-colors duration-200 rounded-md ${
											activeSection === link.id
												? "text-score-accent"
												: "text-zinc-500 hover:text-zinc-300"
										}`}
										data-cursor="pointer"
									>
										{link.label}
										{activeSection === link.id && (
											<motion.div
												className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-score-accent"
												layoutId="nav-indicator"
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 25,
												}}
											/>
										)}
									</button>
								))}
							</div>

							{/* CTA */}
							<button
								onClick={() => scrollTo("contact")}
								className="text-xs font-mono px-4 py-1.5 rounded-full border border-score-accent/30 text-score-accent hover:bg-score-accent/10 transition-all duration-300"
								data-cursor="pointer"
							>
								Let's Talk
							</button>
						</nav>
					</div>
				</motion.header>
			)}
		</AnimatePresence>
	);
}
