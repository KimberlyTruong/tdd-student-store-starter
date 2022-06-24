import "./About.css"
import Logo from "../Logo/Logo"

export default function About(props) {
    return (
        <div id="about">
            <h2>About</h2>
            <div className="about-container">
                <div className="about-left">
                    <p>The codepath student store offers great products at great prices from a great team and for a great cause.</p>
                    <p>We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.</p>
                    <p>All proceeds go towards bringing high quality CS education to college students around the country.</p>
                </div>
                <div className="about-right">
                    <Logo/>
                </div>
            </div>
        </div>
    )
}
