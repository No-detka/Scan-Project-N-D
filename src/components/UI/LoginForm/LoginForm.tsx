import { FC, useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { loginUser } from '@/redux/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { phoneNumber, validPhoneNumber, formatPhoneNumber } from '@/utils/validateFunctions';
import { LoginFormData, ErrorMessage } from '@/interfaces/general.interfaces';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const [activeBtn, setActiveBtn] = useState<string>('login');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginFormData>({
    login: '',
    password: '',
  });
  const [loginValue, setLoginValue] = useState<string>('');
  const [loginError, setLoginError] = useState<ErrorMessage>({
    error: false,
    message: '',
  });
  const [passwordError, setPasswordError] = useState<ErrorMessage>({
    error: false,
    message: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthorized, loginServerError, isLoggingIn } = useAppSelector((state) => state.user);

  const btnChange = useCallback((buttonType: string) => {
    setActiveBtn(buttonType);
  }, []);

  const validateLogin = (value: string) => {
    if (phoneNumber(value)) {
      if (value.length > 1 && !value.startsWith('+7')) {
        value = `+7${value.replace(/^\+?7?/, '')}`;
      }
      if (value.replace(/\s/g, '').length > 12 || !validPhoneNumber(value)) {
        setLoginError({ error: true, message: 'Введите корректные данные' });
      } else {
        setLoginError({ error: false, message: '' });
      }
      setLoginValue(formatPhoneNumber(value));
    } else {
      setLoginError({ error: false, message: '' });
      setLoginValue(value);
    }
    return value.replace(/\s/g, '');
  };

  const validatePassword = (value: string): string => {
    if (value.length < 1) {
      setPasswordError({ error: true, message: 'Неправильный пароль' });
    } else {
      setPasswordError({ error: false, message: '' });
    }
    return value;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    let updatedValue = value;
    if (name === 'login') {
      updatedValue = validateLogin(value);
    } else if (name === 'password') {
      updatedValue = validatePassword(value);
    }

    setLoginData({ ...loginData, [name]: updatedValue });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { login: string; password: string } = {
      login: formData.get('login') as string,
      password: formData.get('password') as string,
    };
    dispatch(loginUser(data));
  };

  useEffect(() => {
    setIsValid(
      loginData.login.length > 0 &&
        loginData.password.length > 0 &&
        !loginError.error &&
        !passwordError.error
    );
  }, [loginData, loginError, passwordError]);

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  return (
    <div className={styles.formWrapper}>
      <img src="./lockIcon.svg" alt="Lock" className={styles.formIcon} />
      <div className={styles.btnWrapper}>
        <button
          className={clsx(styles.authBtn, { [styles.btnInactive]: activeBtn !== 'login' })}
          onClick={() => btnChange('login')}
        >
          Войти
        </button>
        <button
          className={clsx(styles.authBtn, { [styles.btnInactive]: activeBtn !== 'register' })}
          onClick={() => btnChange('register')}
        >
          Зарегистрироваться
        </button>
      </div>
      {activeBtn === 'login' ? (
        <>
          <form onSubmit={handleFormSubmit} className={styles.loginForm}>
            <label htmlFor="login" className={styles.label}>
              Логин или номер телефона:
            </label>
            <input
              type="text"
              id="login"
              name="login"
              value={loginValue}
              onChange={handleOnChange}
              className={clsx(styles.input, { [styles.errorInput]: loginError.error === true })}
              autoComplete="username"
              required
            />
            <span className={styles.errorMsg}>{loginError.message}</span>
            <label htmlFor="password" className={styles.label}>
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleOnChange}
              className={clsx(styles.input, { [styles.errorInput]: passwordError.error === true })}
              autoComplete="current-password"
              required
            />
            <span className={styles.errorMsg}>{passwordError.message}</span>
            <button type="submit" disabled={!isValid || isLoggingIn} className={styles.submitBtn}>
              {isLoggingIn ? 'Загрузка...' : 'Войти'}
            </button>
            <span className={styles.errorMsg}>{loginServerError}</span>
          </form>
          <Link className={styles.recoveryLink} to={'/password-recovery'}>
            Восстановить пароль
          </Link>
          <div className={styles.socialNetwork}>
            <p className={styles.socialText}>Войти через:</p>
            <div className={styles.socialBtnWrapper}>
              <button className={styles.socialBtn}>
                <img src="./googleIcon.svg" alt="Google" />
              </button>
              <button className={styles.socialBtn}>
                <img src="./facebookIcon.svg" alt="Facebook" />
              </button>
              <button className={styles.socialBtn}>
                <img src="./yandexIcon.svg" alt="Ya" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className={styles.registerForm}>Форма регистрации временно недоступна!</p>
      )}
    </div>
  );
};

export default LoginForm;
