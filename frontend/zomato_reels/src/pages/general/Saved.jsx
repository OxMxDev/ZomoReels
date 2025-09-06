import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// SVG Icons
const IconHeart = ({ size = 16 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
	</svg>
);

const IconBookmark = ({ size = 16 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M6 2h12v20l-6-3-6 3V2z"></path>
	</svg>
);

const IconComment = ({ size = 16 }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>
);

const Saved = () => {
	const navigate = useNavigate();
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:3000/api/food/save`, {
				withCredentials: true,
			})
			.then((response) => {
				const savedFoods = response.data.savedFoods.map((item) => ({
					_id: item.food._id,
					description: item.food.description,
					video: item.food.video,
					likeCount: item.food.likeCount,
					saveCount: item.food.saveCount,
					commentCount: item.food.commentCount || 0,
                    
				}));
				setVideos(savedFoods);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<div className="saved-root min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<header className="saved-header p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
				<button
					onClick={() => navigate("/home")}
					className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
				>
					← Back
				</button>
				<h2 className="text-2xl font-semibold">Saved</h2>
			</header>

			<section className="saved-grid p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{videos.length === 0 ? (
					<p className="text-center col-span-full">No saved videos yet.</p>
				) : (
					videos.map((video) => (
						<div
							key={video._id}
							className="saved-item bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
						>
							<div className="saved-thumb">
								<video
									src={video.video}
									muted
									controls
									className="w-full h-48 object-cover"
								/>
							</div>
							<div className="p-2">
								<div className="saved-title text-sm font-medium truncate">
									{video.description}
								</div>
								<div className="saved-meta text-xs flex justify-between mt-1 text-gray-600 dark:text-gray-400">
									<span className="flex items-center gap-1">
										<IconHeart /> {video.likeCount || 0}
									</span>
									<span className="flex items-center gap-1">
										<IconBookmark /> {video.saveCount || 0}
									</span>
									<span className="flex items-center gap-1">
										<IconComment /> {video.commentCount || 0}
									</span>
								</div>
							</div>
						</div>
					))
				)}
			</section>
		</div>
	);
};

export default Saved;
