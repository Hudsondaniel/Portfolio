"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
	children: ReactNode;
	className?: string;
	strength?: number;
}

export default function MagneticButton({
	children,
	className = "",
	strength = 30,
}: MagneticButtonProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const { clientX, clientY } = e;
		const { left, top, width, height } = ref.current.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
	};

	const reset = () => setPosition({ x: 0, y: 0 });

	return (
		<motion.div
			ref={ref}
			className={className}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x: position.x, y: position.y }}
			transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
			data-cursor="pointer"
		>
			{children}
		</motion.div>
	);
}
