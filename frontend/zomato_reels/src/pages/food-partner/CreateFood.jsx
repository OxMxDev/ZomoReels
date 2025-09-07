import React, { useState, useEffect } from "react";
import "../../styles/create-food.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateFood = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [videoFile, setVideoFile] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState(null);
  const navigate = useNavigate();
	useEffect(() => {
		if (!videoFile) {
			setVideoPreview(null);
			return;
		}
		const url = URL.createObjectURL(videoFile);
		setVideoPreview(url);
		return () => URL.revokeObjectURL(url);
	}, [videoFile]);

	const handleVideoChange = (e) => {
		const f = e.target.files && e.target.files[0];
		if (f) {
			setVideoFile(f);
			setError(null);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
    const formData = new FormData()
    formData.append('name',name)
    formData.append('description',description)
    formData.append('video',videoFile)

    const response = await axios.post(
			"https://zomo-reels-1avw.vercel.app/api/food",
			formData,
			{
				withCredentials: true,
			}
		);
    console.log(response)
    navigate('/home')
	};

	return (
		<main className="create-food-page">
			<form className="cf-card" onSubmit={handleSubmit}>
				<h2 className="cf-title">Create food item</h2>

				<label className="cf-field">
					<span className="cf-label">Video</span>

					<div
						className={`cf-dropzone ${videoPreview ? "has-preview" : ""}`}
						onClick={() => document.getElementById("cf-file-input")?.click()}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => {
							e.preventDefault();
							const f = e.dataTransfer?.files?.[0];
							if (f && f.type.startsWith("video/")) setVideoFile(f);
						}}
					>
						<input
							id="cf-file-input"
							className="cf-file-input"
							type="file"
							accept="video/*"
							onChange={handleVideoChange}
						/>

						{!videoPreview ? (
							<div className="cf-drop-inner">
								<svg
									width="48"
									height="48"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden
								>
									<path
										d="M12 3v10"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M19 10l-7-7-7 7"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<rect
										x="3"
										y="13"
										width="18"
										height="8"
										rx="2"
										stroke="currentColor"
										strokeWidth="1.5"
									/>
								</svg>
								<div className="cf-drop-text">Click or drop a video here</div>
								<div className="cf-drop-muted">MP4, MOV — max 50MB</div>
							</div>
						) : (
							<div className="cf-video-preview">
								<video
									className="cf-video"
									src={videoPreview}
									controls
									muted
									playsInline
								/>
							</div>
						)}
					</div>
				</label>

				<label className="cf-field">
					<span className="cf-label">Name</span>
					<input
						className="cf-input"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="e.g. Butter Chicken Wrap"
					/>
				</label>

				<label className="cf-field">
					<span className="cf-label">Description</span>
					<textarea
						className="cf-textarea"
						rows={4}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Short description for this food item"
					/>
				</label>

				{error && <div className="cf-error">{error}</div>}

				<div className="cf-actions">
					<button
						type="submit"
						className="cf-btn cf-btn-primary"
						disabled={submitting}
					>
						{submitting ? "Uploading..." : "Create"}
					</button>
					<button
						type="button"
						className="cf-btn cf-btn-ghost"
						onClick={() => {
							setName("");
							setDescription("");
							setVideoFile(null);
							setVideoPreview(null);
							setError(null);
						}}
						disabled={submitting}
					>
						Reset
					</button>
				</div>
			</form>
		</main>
	);
};

export default CreateFood;
