import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";

export default function Home() {
	const [reels, setReels] = useState([]);
	const containerRef = useRef(null);

	useEffect(() => {
		axios
			.get("http://localhost:3000/api/food", {
				withCredentials: true,
			})
			.then((response) => {
				setReels(response.data.food);
			});
	}, []);

	// Play only the video that is mostly visible
	useEffect(() => {
		if (!reels || reels.length === 0) return;

		const options = {
			root: null,
			rootMargin: "0px",
			threshold: [0.5, 0.6, 0.75],
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const video = entry.target.querySelector("video");
				if (!video) return;

				if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
					// pause other videos
					document.querySelectorAll(".reel-video").forEach((v) => {
						if (v !== video) v.pause();
					});
					// play the visible video
					const playPromise = video.play();
					if (playPromise && typeof playPromise.catch === "function") {
						playPromise.catch(() => {
							// autoplay might be blocked; keep it muted so it usually succeeds
						});
					}
				} else {
					video.pause();
				}
			});
		}, options);

		const items =
			containerRef.current?.querySelectorAll(".reel-item") ||
			document.querySelectorAll(".reel-item");
		items.forEach((item) => observer.observe(item));

		return () => {
			observer.disconnect();
		};
	}, [reels]);
	return (
		<div className="reels-container">
			{reels.map((r) => (
				<section className="reel-item" key={r._id}>
					<video
						className="reel-video"
						src={r.video}
						playsInline
						muted
						loop
						autoPlay
					/>

					<div className="reel-overlay">
						<div className="reel-description" title={r.description}>
							{r.description}
						</div>

						<Link className="visit-btn" to={"/food-partner" + r.foodPartner}>
							Visit store
						</Link>
					</div>
				</section>
			))}
		</div>
	);
}
