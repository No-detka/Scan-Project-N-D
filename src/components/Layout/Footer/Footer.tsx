import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <Link to="/" className={styles.footerLogo}>
          <img src="./scanBurgerLogo.svg" alt="Logo" />
        </Link>
        <div className={styles.infoWrapper}>
          <p className={styles.text}>г. Москва, Цветной б-р, 40</p>
          <p className={styles.text}>
            <a className={styles.link} href="tel:+74957712111">
              +7 495 771 21 11
            </a>
          </p>
          <p className={styles.text}>
            <a className={styles.link} href="mailto:info@skan.ru">
              info@skan.ru
            </a>
          </p>
          <p className={styles.text}>
            Copyright. <span>{new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
