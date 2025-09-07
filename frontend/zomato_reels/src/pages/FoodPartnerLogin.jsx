import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function PartnerLogin() {
	const navigate = useNavigate();
	const handleSubmit = async(e)=>{
		e.preventDefault()
		const email = e.target.email.value
		const password = e.target.pass.value

		const response = await axios.post(
			"https://zomo-reels-1avw.vercel.app/api/auth/food-partner/login",
			{
				email,
				password,
			},
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		navigate("/create-food")
	}
	return (
		<div className="auth-page">
			<div
				className="auth-card"
				role="region"
				aria-label="Partner sign in"
				style={{ maxWidth: 520 }}
			>
				<header className="auth-header">
					<h2 className="auth-title">Food Partner Login</h2>
					<p className="auth-sub">Sign in to manage your restaurant</p>
				</header>

				<form className="auth-form" noValidate onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="p-email">Email</label>
						<input
							id="p-email"
							type="email"
							name="email"
							placeholder="partner@example.com"
						/>
					</div>

					<div className="field">
						<label htmlFor="p-password">Password</label>
						<input id="p-password" type="password" name="pass" placeholder="••••••••" />
					</div>

					<div className="actions">
						<button type="submit" className="btn btn-primary">
							Sign in
						</button>
						<Link
							to="/food-partner/register"
							className="btn btn-ghost"
							style={{ textDecoration: "none" }}
						>
							Create partner account
						</Link>
					</div>

					<p className="muted" style={{ marginTop: 10 }}>
						Not a partner? <Link to="/user/login">User sign in</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
