import student from '../../images/student.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="aboutme" id='about-me'>
      <h2 className="aboutme__heading">Студент</h2>
      <div className="aboutme__container">
        <div className="aboutme__text">
          <div className="aboutme__text-container">
            <p className="aboutme__name">Миран</p>
            <p className="aboutme__info">Фронтенд-разработчик, 28 лет</p>
            <p className="aboutme__description">
              Я родился в Армении, но с самого детства живу на северном краю в
              городе Мурманск, закончил политехнический факультет МГТУ по
              специальности ИВТ(б). У меня есть жена. Я люблю смотреть сериалы и
              слушать музыку, а ещё увлекаюсь бегом, даже имел в этом
              направлении профессиональные успехи. В 2021 году начал кодить. До
              этого работал в частной компании, где занимался поддержанием
              программного обеспечения и компьютерной техники с 2015 года. После
              того, как прошёл курс по веб-разработке, попал в стартап, который
              которым постоянно занимаюсь.
            </p>
          </div>
          <a
            className="aboutme__link"
            href="https://github.com/MiranKazaryan"
          >
            Github
          </a>
        </div>
        <img className="aboutme__photo" src={student} alt="Фото студента"></img>
      </div>
    </section>
  );
}

export default AboutMe;
