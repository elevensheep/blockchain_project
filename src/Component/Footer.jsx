import "../Style/Footer.css";
import instaIcon from "../Image/footer_icon.png";
import linkedinIcon from "../Image/footer_icon2.png";
import facebookIcon from "../Image/footer_icon3.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p>제작자 | SANGCHAI</p>
                    <p>고객센터 1544-6612 | help@sansaride.kr</p>
                    <p>© 2024 sansaride. All rights reserved.</p>
                </div>

                <div className="footer-right">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instaIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
