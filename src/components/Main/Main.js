import "./Main.css";
import Promo from "../Promo/Promo.js";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
      <Header></Header>
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <Footer></Footer>
    </>
  );
}

export default Main;
