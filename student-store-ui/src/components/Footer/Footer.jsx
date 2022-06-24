import "./Footer.css"

export default function Footer(props){
    return (
        <div id="footer">
            <hr></hr>
            <div className="footer-text-container">
                <div className="footer-column">
                    <h4>Categories</h4>
                    <a onClick={() => props.handleFiltering("All Categories")} href={"#products-begin"}>All Categories</a>
                    <a onClick={() => props.handleFiltering("clothing")} href={"#products-begin"}>Clothing</a>
                    <a onClick={() => props.handleFiltering("food")} href={"#products-begin"}>Food</a>
                    <a onClick={() => props.handleFiltering("accessories")} href={"#products-begin"}>Accessories</a>
                    <a onClick={() => props.handleFiltering("tech")} href={"#products-begin"}>Tech</a>
                </div>
                <div className="footer-column">
                    <h4>Company</h4>
                    <a href={"#about"}>About Us</a>
                    <a>Find a Store</a>
                    <a>Terms</a>
                    <a>Sitemap</a>
                    <a>Careers</a>
                </div>
                <div className="footer-column">
                    <h4>Support</h4>
                    <a href={"#contact-us"}>Contact Us</a>
                    <a>Money Refund</a>
                    <a>Order Status</a>
                    <a>Shipping Info</a>
                    <a>Open Dispute</a>
                </div>
                <div className="footer-column">
                    <h4>Account</h4>
                    <a href={"#home"}>Login</a>
                    <a>Register</a>
                    <a>Account Setting</a>
                    <a href={"#home"}>My Orders</a>
                </div>
                <div className="footer-column">
                    <h4>Socials</h4>
                    <a>Facebook</a>
                    <a>Twitter</a>
                    <a>LinkedIn</a>
                    <a>Instagram</a>
                    <a>YouTube</a>
                </div>
            </div>
        </div>
    )
}
