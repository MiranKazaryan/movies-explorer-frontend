import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__text">&#169; {new Date().getFullYear()}</p>\
        <div className="footer__links">
          <a className="footer__link">Яндекc.Практикум</a>
          <a className="footer__link">Github</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
