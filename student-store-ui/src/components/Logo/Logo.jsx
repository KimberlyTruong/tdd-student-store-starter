import "./Logo.css"
import { Link } from "react-router-dom";


export default function Logo() {
    // on click go to home page
    return (
        <div className="logo">
            <Link className="logo-image" to="/">
                <div id="codePathLogo">
                    <p className="codePathLogo-top">Code</p>
                    <p className="codePathLogo-top">Path</p>
                    <p className="codePathLogo-bottom">Store</p>
                </div>
                <i className="fa-solid fa-basket-shopping"></i>
            </Link>
        </div>
    )
  }
