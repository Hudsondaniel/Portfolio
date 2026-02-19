"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			touchMultiplier: 2,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Make lenis available globally for programmatic scrolling
		(window as any).__lenis = lenis;

		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
}
