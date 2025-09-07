import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserLogin() {
    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const email = e.target.uemail.value
        const password = e.target.upass.value
        const response = await axios.post(
					"https://zomo-reels-1avw.vercel.app/api/auth/user/login",
					{
						email,
						password,
					},
					{
						withCredentials: true,
					}
				);
        console.log(response.data);
        navigate("/home")
    }
	return (
		<div className="auth-page">
			<div
				className="auth-card"
				role="region"
				aria-label="User sign in"
				style={{ maxWidth: 520 }}
			>
				<header className="auth-header">
					<h2 className="auth-title">User Login</h2>
					<p className="auth-sub">Enter your credentials to sign in</p>
				</header>

				<form className="auth-form" noValidate onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="u-email">Email</label>
						<input id="u-email" type="email" name="uemail" placeholder="you@example.com" />
					</div>

					<div className="field">
						<label htmlFor="u-password">Password</label>
						<input id="u-password" type="password" name="upass" placeholder="••••••••" />
					</div>

					<div className="actions">
						<button type="submit" className="btn btn-primary">
							Sign in
						</button>
						<Link
							to="/user/register"
							className="btn btn-ghost"
							style={{ textDecoration: "none" }}

						>
							Create account
						</Link>
					</div>

					<p className="muted" style={{ marginTop: 10 }}>
						Are you a food partner?{" "}
						<Link to="/food-partner/login">Partner sign in</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
