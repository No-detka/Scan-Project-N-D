import { FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { userData } from '@/data/constants';
import { logout, getUserInfo } from '@/redux/userSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

import Loader from '@/components/UI/Loader/Loader';
import BurgerMenu from '@/components/UI/BurgerMenu/BurgerMenu';

import styles from './UserPanel.module.scss';

const UserPanel: FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [isMobile, setIsMobile] = useState<boolean>(innerWidth <= 768);

  const handleMobile = () => {
    setIsMobile(innerWidth <= 768);
  };

  const handleLog = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    handleMobile();

    window.addEventListener('resize', handleMobile);

    return () => {
      window.removeEventListener('resize', handleMobile);
    };
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserInfo());
    }
  }, [isAuthorized, dispatch]);

  return (
    <div className={styles.userPanel}>
      {isAuthorized ? (
        <div className={styles.infoWrapper}>
          <div className={styles.companyInfo}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <p className={styles.text}>
                  Использовано компаний
                  <span className={styles.numbers}>
                    {userInfo.usedCompanyCount}</span>
                </p>
                <p className={styles.text}>
                  Лимит по компаниям
                  <span className={clsx(styles.numbers, styles.greenNum)}>
                    {userInfo.companyLimit}
                  </span>
                </p>
              </>
            )}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userInfoWrap}>
              <p className={styles.name}>{userData.name}</p>
              <button className={styles.logoutBtn} onClick={handleLog}>
                Выйти
              </button>
            </div>
            <img src={userData.img} alt="Avatar" className={styles.avatar} />
          </div>
          {isMobile && <BurgerMenu />}
        </div>
      ) : (
        <>
          <div className={styles.loginAction}>
            <Link to={'/register'} className={styles.registerLink}>
              Зарегистрироваться
            </Link>
            <div className={styles.divider}></div>
            <Link to={'/login'} className={styles.loginLink}>
              Войти
            </Link>
          </div>
          {isMobile && <BurgerMenu />}
        </>
      )}
    </div>
  );
};

export default UserPanel;
