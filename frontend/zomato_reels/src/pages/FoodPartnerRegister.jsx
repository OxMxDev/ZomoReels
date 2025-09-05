import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function PartnerRegister() {
	const navigate = useNavigate();

	const handleSubmit = async(e)=>{
		e.preventDefault()
		const businessName = e.target.business.value
		const contactName = e.target.contact.value
		const phone = e.target.phone.value
		const email = e.target.email.value
		const password = e.target.password.value
		const address = e.target.address.value

		const response = await axios.post("http://localhost:3000/api/auth/food-partner/register",{
			fullName:businessName,
			contactName,
			phone,	
			address,
			email,
			password,
		},{
			withCredentials:true
		})

		console.log(response.data);
		navigate("/create-food")
	}
	return (
		<div className="auth-page">
			<div
				className="auth-card"
				role="region"
				aria-label="Partner registration"
				style={{ maxWidth: 520 }}
			>
				<header className="auth-header">
					<h2 className="auth-title">Create partner account</h2>
					<p className="auth-sub">Register your restaurant</p>
				</header>

				<form className="auth-form" noValidate onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="business">Business name</label>
						<input
							id="business"
							name="business"
							type="text"
							placeholder="Business name"
						/>
					</div>

					<div className="field">
						<label htmlFor="contact">Contact name</label>
						<input
							id="contact"
							name="contact"
							type="text"
							placeholder="Contact person"
						/>
					</div>

					<div className="field">
						<label htmlFor="phone">Phone no</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							placeholder="+91 98765 43210"
						/>
					</div>

					<div className="field">
						<label htmlFor="pemail">Email</label>
						<input
							id="pemail"
							name="email"
							type="email"
							placeholder="partner@example.com"
						/>
					</div>

					<div className="field">
						<label htmlFor="ppass">Password</label>
						<input
							id="ppass"
							name="password"
							type="password"
							placeholder="Choose a password"
						/>
					</div>

					<div className="field">
						<label htmlFor="address">Address</label>
						<textarea
							id="address"
							name="address"
							placeholder="Street, city, zip"
							rows={3}
						/>
					</div>

					<div className="actions">
						<button type="submit" className="btn btn-primary">
							Create partner account
						</button>
						<Link
							to="/food-partner/login"
							className="btn btn-ghost"
							style={{ textDecoration: "none" }}
						>
							Already a partner
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
