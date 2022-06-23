import * as React from "react"
import "./Navbar.css"
import Logo from "../Logo/Logo"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <div id="social-media">
        <p></p>
      </div>
      <div id = "nav-titles">
        <p className="nav-title" id="home-page">Home</p>
        <p className="nav-title" id="about-us-page">About Us</p>
        <p className="nav-title" id="contact-us-page">Contact Us</p>
        <p className="nav-title" id="buy-now-page">Buy Now</p>
      </div>
    </nav>
  )
}
