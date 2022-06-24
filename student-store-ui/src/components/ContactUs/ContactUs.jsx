import "./ContactUs.css"
import codepathImg from "./../Images/codepath.png"

export default function ContactUs(props){
    return (
        <div id="contact-us">
            <h2>Contact Us</h2>
            <div className="contact-container">
                <div className="contact-left">
                    <div className="contact-column">
                        <p>Email</p>
                        <p>Phone</p>
                        <p>Address</p>
                    </div>
                    <div className="contact-column">
                        <p>code@path.org</p>
                        <p>1-800-CODEPATH</p>
                        <p>123 Fake Street, San Francisco, CA</p>
                    </div>
                </div>
                <img src={codepathImg}/>
            </div>
        </div>
    )
}
