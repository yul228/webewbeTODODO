import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import api from '../../constants/api';
import { AxiosError } from 'axios';

interface FormaRegi {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: React.FC = () => {
  const perehod = useNavigate();
  const [oshibochkaRegi, ustanoviOshibochkuRegi] = useState<string | null>(null);
  const { control: upravlenieFormoi, handleSubmit: obrabotchikOtpravochki, formState: { errors}, watch: sledimZa } = useForm<FormaRegi>();
  const parolchik = sledimZa('password');

  const priRegistracii = async (dannye: FormaRegi) => {
    try {
      const otvetik = await api.post('/auth/registration', {
        email: dannye.email,
        password: dannye.password
      });
      
      if (otvetik.data?.token) {
        localStorage.setItem('authToken', otvetik.data.token);
      }
      perehod('/login');
      
    } catch (oshibochka) {
      let soobshchenieObOshibochke = 'Ой, что-то совсем непонятное случилось!';
      if (oshibochka instanceof AxiosError) {
        soobshchenieObOshibochke = oshibochka.response?.data?.message || 'Проблемка при создании аккаунтика';
      }
      ustanoviOshibochkuRegi(soobshchenieObOshibochke);
    }
  };

  return (
    <div className={styles['auth-page']}>
      <h1 className={styles.title}>Регистрация</h1>
      
      {oshibochkaRegi && (
        <div className={styles['error-alert']}>
          🎀 {oshibochkaRegi}
        </div>
      )}

      <form onSubmit={obrabotchikOtpravochki(priRegistracii)} className={styles['auth-form']}>
        <div className={styles['fields_container']}>
          <div className={styles['field_container']}>
            <label>Почта</label>
            <Controller
              name="email"
              control={upravlenieFormoi}
              rules={{ required: 'Обязательно для заполнения' }}
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="почта"
                  className={errors.email ? styles['error'] : ''}
                  {...field}
                />
              )}
            />
            {errors.email && <span className={styles['error-message']}> {errors.email.message}</span>}
          </div>

          <div className={styles['field_container']}>
            <label>Придумай пароль</label>
            <Controller
              name="password"
              control={upravlenieFormoi}
              rules={{ required: 'Нужно защитить аккаунтик' }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Самый секретный пароль"
                  className={errors.password ? styles['error'] : ''}
                  {...field}
                />
              )}
            />
            {errors.password && <span className={styles['error-message']}> {errors.password.message}</span>}
          </div>

          <div className={styles['field_container']}>
            <label>Повтори пароль</label>
            <Controller
              name="confirmPassword"
              control={upravlenieFormoi}
              rules={{
                required: 'Нужно повторить пароль',
                validate: znachenie => znachenie === parolchik || 'Парольчики не совпадают'
              }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Тот же самый пароль"
                  className={errors.confirmPassword ? styles['error'] : ''}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className={styles['error-message']}>
                 {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles['button_container']}>
          <button type="submit">Создать аккаунтик →</button>
        </div>
      </form>
      
      <p className={styles.qa}>
        Уже есть аккаунтик? <Link to="/login">Войти тут</Link>
      </p>
    </div>
  );
};