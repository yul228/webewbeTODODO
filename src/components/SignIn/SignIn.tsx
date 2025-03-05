import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; 
import styles from './signin.module.css';
import api from '../../constants/api';
import { AxiosError } from 'axios'; 

interface FormaVhodika {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const perehod = useNavigate();
  const [oshibochkaVhodika, ustanoviOshibochku] = useState<string | null>(null);
  const { control: upravlenieFormoi, handleSubmit: obrabotchikOtpravochki, formState: { errors } } = useForm<FormaVhodika>();

  const priPodacheFormochki = async (dannye: FormaVhodika) => {
    try {
      ustanoviOshibochku(null);
      const otvetik = await api.post('/auth/login', dannye);
      
      if (otvetik.data?.token) {
        localStorage.setItem('authToken', otvetik.data.token);
        if (otvetik.data.user) {
          localStorage.setItem('user', JSON.stringify(otvetik.data.user));
        }
      }
      
      perehod('/todolist');
      
    } catch (oshibochka) {
      if (oshibochka instanceof AxiosError) {
        const soobshchenie = oshibochka.response?.data?.message || 'Ой, что-то не так с данными для входа!';
        ustanoviOshibochku(soobshchenie);
      } else {
        ustanoviOshibochku('Упс, непонятная ошибочка :3');
      }
    }
  };

  return (
    <div className={styles['auth-page']}>
      <h1 className={styles.title}>Входик</h1>
      
      {oshibochkaVhodika && (
        <div className={styles['error-alert']}>
           {oshibochkaVhodika}
        </div>
      )}
      
      <form onSubmit={obrabotchikOtpravochki(priPodacheFormochki)} className={styles['auth-form']}>
        <div className={styles['fields_container']}>
          <div className={styles['field_container']}>
            <label>Почта</label>
            <Controller
              name="email"
              control={upravlenieFormoi}
              defaultValue=""
              rules={{ 
                required: 'Почту нужно заполнить',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Это не похоже на почту'
                }
              }}
              render={({ field }) => (
                <input
                  type="email"
                  placeholder="Твоя почта"
                  className={errors.email ? styles['error'] : ''}
                  {...field}
                />
              )}
            />
            {errors.email && <span className={styles['error-message']}> {errors.email.message}</span>}
          </div>

          <div className={styles['field_container']}>
            <label>Пароль</label>
            <Controller
              name="password"
              control={upravlenieFormoi}
              defaultValue=""
              rules={{ required: 'Без парольчика нельзя' }}
              render={({ field }) => (
                <input
                  type="password"
                  placeholder="Секретный набор букв"
                  className={errors.password ? styles['error'] : ''}
                  {...field}
                />
              )}
            />
            {errors.password && <span className={styles['error-message']}>{errors.password.message}</span>}
          </div>
        </div>

        <div className={styles['button_container']}>
          <button type="submit">Войти →</button>
        </div>
      </form>
      
      <p className={styles.qa}>
        Нет аккаунтика? <Link to="/registration">Создать новенький</Link>
      </p>
    </div>
  );
};