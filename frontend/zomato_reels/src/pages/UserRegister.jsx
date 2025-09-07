import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function UserRegister() {
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault()

        const fullName = e.target.uname.value
        const email = e.target.uemail.value
        const password = e.target.upass.value

        const response = await axios.post(
					"https://zomo-reels-1avw.vercel.app/api/auth/user/register",
					{
						fullName,
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
				aria-label="User registration"
				style={{ maxWidth: 520 }}
			>
				<header className="auth-header">
					<h2 className="auth-title">Create account</h2>
					<p className="auth-sub">Simple sign up — no frills</p>
				</header>

				<form className="auth-form" noValidate onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="uname">Full name</label>
						<input id="uname" name="uname" type="text" placeholder="Jane Doe" />
					</div>

					<div className="field">
						<label htmlFor="uemail">Email</label>
						<input id="uemail" name="uemail" type="email" placeholder="you@example.com" />
					</div>

					<div className="field">
						<label htmlFor="upass">Password</label>
						<input
							id="upass"
                            name="upass"
							type="password"
							placeholder="Choose a strong password"
						/>
					</div>

					<div className="actions">
						<button type="submit" className="btn btn-primary">
							Create account
						</button>
						<Link
							to="/user/login"
							className="btn btn-ghost"
							style={{ textDecoration: "none" }}
						>
							Already have an account
						</Link>
					</div>

					<p className="muted" style={{ marginTop: 10 }}>
						Want to register as a food partner?{" "}
						<Link to="/food-partner/register">Register as partner</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
