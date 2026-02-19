"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Detect mobile
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);

		const move = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
			setIsVisible(true);
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.tagName === "A" ||
				target.tagName === "BUTTON" ||
				target.closest("a") ||
				target.closest("button") ||
				target.dataset.cursor === "pointer"
			) {
				setIsHovering(true);
			} else {
				setIsHovering(false);
			}
		};

		const handleMouseLeave = () => {
			setIsVisible(false);
		};

		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseleave", handleMouseLeave);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	if (isMobile) return null;

	return (
		<AnimatePresence>
			{isVisible && (
				<>
					{/* Outer ring */}
					<motion.div
						className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
						animate={{
							x: position.x - (isHovering ? 24 : 16),
							y: position.y - (isHovering ? 24 : 16),
							width: isHovering ? 48 : 32,
							height: isHovering ? 48 : 32,
						}}
						transition={{
							type: "spring",
							stiffness: 250,
							damping: 20,
							mass: 0.5,
						}}
						initial={{ opacity: 0, scale: 0 }}
						exit={{ opacity: 0, scale: 0 }}
					>
						<div
							className={`w-full h-full rounded-full border transition-colors duration-200 ${
								isHovering ? "border-score-accent bg-score-accent/10" : "border-white/30"
							}`}
						/>
					</motion.div>

					{/* Inner dot */}
					<motion.div
						className="fixed top-0 left-0 z-[9999] pointer-events-none"
						animate={{
							x: position.x - 3,
							y: position.y - 3,
						}}
						transition={{
							type: "spring",
							stiffness: 500,
							damping: 28,
							mass: 0.3,
						}}
						initial={{ opacity: 0, scale: 0 }}
						exit={{ opacity: 0, scale: 0 }}
					>
						<div className="w-1.5 h-1.5 rounded-full bg-white" />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
