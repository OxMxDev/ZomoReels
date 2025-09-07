import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";

/* SVG icon components (use currentColor to inherit color) */
const IconHeart = ({ size = 20 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden
	>
		<path
			d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
			stroke="currentColor"
			strokeWidth="1.2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconBookmark = ({ size = 20 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden
	>
		<path
			d="M6 2h12v20l-6-3-6 3V2z"
			stroke="currentColor"
			strokeWidth="1.2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconComment = ({ size = 20 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden
	>
		<path
			d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
			stroke="currentColor"
			strokeWidth="1.2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const IconHome = ({ size = 20 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden
	>
		<path
			d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"
			stroke="currentColor"
			strokeWidth="1.2"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default function Home() {
	const [reels, setReels] = useState([]);
	const containerRef = useRef(null);

	useEffect(() => {
		axios
			.get("https://zomo-reels-1avw.vercel.app/api/food", {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.data);
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

	async function likeVideo(r){
		const response = await axios.post(`http://localhost:3000/api/food/like`,{foodId:r._id},{
			withCredentials:true
		})
		if(response.data.like){
			console.log('liked')
			setReels((prevReels) =>
				prevReels.map((item) =>
					item._id === r._id
						? { ...item, likeCount: (item.likeCount || 0) + 1 }
						: item
				)
			);
		}else{
			console.log('unliked')
			setReels((prevReels) =>
				prevReels.map((item) =>
					item._id === r._id
						? { ...item, likeCount: Math.max((item.likeCount || 1) - 1, 0) }
						: item
				)
			);
		}
	}

	async function bookmarkVideo(r){
		const response = await axios.post(`http://localhost:3000/api/food/save`,{foodId:r._id},{withCredentials:true})
		console.log(response)
		if(response.data.save){
			console.log('bookmarked')
			setReels((prevReels) =>
				prevReels.map((item) =>
					item._id === r._id
						? { ...item, saveCount: (item.saveCount || 0) + 1 }
						: item
				)
			);
		}else{
			console.log('unbookmarked')
			setReels((prevReels) =>
				prevReels.map((item) =>
					item._id === r._id
						? { ...item, saveCount: Math.max((item.saveCount || 1) - 1, 0) }
						: item
				)
			);
		}
	}
	return (
		<>
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

						<div className="reel-side-actions">
							<button onClick={()=>likeVideo(r)} className="action-btn" aria-label="like">
								<IconHeart />
								<span className="meta">{r.likeCount || 0}</span>
							</button>
							<button onClick={()=>bookmarkVideo(r)} className="action-btn" aria-label="save">
								<IconBookmark />
								<span className="meta">{r.saveCount || 0}</span>
							</button>
							<button className="action-btn" aria-label="comments">
								<IconComment />
								<span className="meta">{r.comments || 0}</span>
							</button>
						</div>

						<div className="reel-overlay">
							<div className="reel-description" title={r.description}>
								{r.description}
							</div>

							<Link className="visit-btn" to={"/food-partner/" + r.foodPartner}>
								Visit store
							</Link>
						</div>
					</section>
				))}
			</div>

			<nav className="home-fixed-nav" aria-label="main navigation">
				<Link to="/" className="nav-item">
					<IconHome />
					<span className="nav-label">home</span>
				</Link>
				<Link to="/saved" className="nav-item">
					<IconBookmark />
					<span className="nav-label">save</span>
				</Link>
			</nav>
		</>
	);
}
