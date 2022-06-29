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
        <a href={"/#home"} className="nav-title" id="home-page">Home</a>
        <a href={"/#about"} className="nav-title" id="about-us-page">About Us</a>
        <a href={"/#contact-us"} className="nav-title" id="contact-us-page">Contact Us</a>
        <a href={"/#products-begin"} className="nav-title" id="buy-now-page">Buy Now</a>
        <a href={"/past-purchases"} className="nav-title">Past Purchases</a>
      </div>
    </nav>
  )
}
