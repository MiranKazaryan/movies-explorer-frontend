import './NavTab.css';

function NavTab(){
    return(
        <ul className='navtab'>
        <li className='navtab__item'>
            <a className='navtab__button' href="#about-project">О проекте</a>
        </li>
        <li className='navtab__item'>
            <a className='navtab__button' href="#technology">Технологии</a>
        </li>
        <li className='navtab__item'>
            <a className='navtab__button' href="#about-me">Студент</a>
        </li>
      </ul>
    );
}

export default NavTab;