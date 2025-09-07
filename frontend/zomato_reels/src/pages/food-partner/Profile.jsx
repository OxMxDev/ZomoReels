import React from "react";
import "../../styles/food-partner-profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const Profile = () => {
    const {id} = useParams();
    const [profile,setProfile] = useState(null)
	const [videos,setVideos] = useState([])
    useEffect(() => {
			axios
				.get(`https://zomo-reels.vercel.app/api/food-partner/${id}`, {
					withCredentials: true,
				})
				.then((response) => {
					console.log("API Response:", response.data);
					setProfile(response.data.foodPartner);
					setVideos(response.data.foodPartner.foodItems);
				})
				.catch((err) => console.error("Error fetching profile:", err));
		}, [id]);

	return (
		<div className="fp-profile">
			<div className="fp-header">
					<img
						className="fp-avatar"
						src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D"
						alt=""
					/>
				<div className="fp-info">
					<div className="fp-name-chip">{profile?.fullName}</div>
					<div className="fp-address-chip">{profile?.address}</div>
				</div>
			</div>

			<div className="fp-stats">
				<div className="fp-stat">
					<div className="fp-stat-label">total meals</div>
					<div className="fp-stat-value">{profile?.totalMeals}</div>
				</div>
				<div className="fp-stat">
					<div className="fp-stat-label">customer served</div>
					<div className="fp-stat-value">{profile?.customerServed}</div>
				</div>
			</div>

			<hr className="fp-divider" />

			<div className="fp-videos">
				{videos.map((v) => (
					<div key={v.id} className="fp-video-tile">
						<div className="fp-video-placeholder">
							<video src={v.video} muted></video>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Profile;
