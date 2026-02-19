"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface ScrollRevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	direction?: "up" | "down" | "left" | "right" | "none";
	duration?: number;
	once?: boolean;
}

const directionOffsets = {
	up: { y: 60, x: 0 },
	down: { y: -60, x: 0 },
	left: { x: 60, y: 0 },
	right: { x: -60, y: 0 },
	none: { x: 0, y: 0 },
};

export default function ScrollReveal({
	children,
	className = "",
	delay = 0,
	direction = "up",
	duration = 0.7,
	once = true,
}: ScrollRevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, margin: "-80px" });
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		} else if (!once) {
			controls.start("hidden");
		}
	}, [isInView, controls, once]);

	const offset = directionOffsets[direction];

	return (
		<motion.div
			ref={ref}
			className={className}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: {
					opacity: 0,
					x: offset.x,
					y: offset.y,
					filter: "blur(4px)",
				},
				visible: {
					opacity: 1,
					x: 0,
					y: 0,
					filter: "blur(0px)",
					transition: {
						duration,
						delay,
						ease: [0.16, 1, 0.3, 1],
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}
