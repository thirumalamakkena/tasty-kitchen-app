import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterestSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-section-container">
      <div className="footer-section">
        <div className="website-logo-name-section">
          <img
            alt="website-footer-logo"
            className="footer-website-logo"
            src="https://res.cloudinary.com/dpakgiqtz/image/upload/v1694933201/wngvwcp4rd3eu9kzp41c.png"
          />
          <h1 className="footer-web-name">Tasty Kitchen</h1>
        </div>
        <p className="footer-description">
          The only thing we are serious about is food. Contact us on
        </p>

        <div className="contact-logos-container">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="footer-contact-logo"
          />
          <FaInstagram
            testid="instagram-social-icon"
            className="footer-contact-logo"
          />
          <FaTwitter
            testid="twitter-social-icon"
            className="footer-contact-logo"
          />
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="footer-contact-logo"
          />
        </div>
      </div>
    </div>
  )
}
