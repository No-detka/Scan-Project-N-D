import { FC, ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './Layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
