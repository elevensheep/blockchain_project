import "../Style/Footer.css";
import facebookIcon from "../Image/footer_icon.png";
import instaIcon from "../Image/footer_icon2.png";
import linkedinIcon from "../Image/footer_icon3.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p>제작 | K-디지털 김관영 박선아 이정욱 이희재</p>
                    <p>고객센터 1544-6612 | help@chaincar.kr</p>
                    <p>© 2025 ChainCar. All rights reserved.</p>
                </div>

                <div className="footer-right">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebookIcon} alt="Facebook" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instaIcon} alt="Instagram" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
