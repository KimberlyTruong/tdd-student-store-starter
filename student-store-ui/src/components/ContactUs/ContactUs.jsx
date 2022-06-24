import "./ContactUs.css"

export default function ContactUs(props){
    return (
        <div id="contact-us">
            <h2>Contact Us</h2>
            <div className="contact-container">
                <div className="contact-row">
                    <p>Email</p>
                    <p>code@path.org</p>
                </div>
                <div className="contact-row">
                    <p>Phone</p>
                    <p>1-800-CODEPATH</p>
                </div>
                <div className="contact-row">
                    <p>Address</p>
                    <p>123 Fake Street, San Francisco, CA</p>
                </div>
                <img src="./../Images/codepath.png"/>
            </div>
        </div>
    )
}
