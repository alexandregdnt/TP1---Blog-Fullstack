import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { UilEnvelope, UilMicrosoft, UilGoogle, UilApple, UilFacebook } from '@iconscout/react-unicons';

export const AuthOptions = () => {
  const [alert, setAlert] = useState(null);

  return (
    <div className="auth__container container">
      {alert ? alert : ''}

      <h2 className="section__title">Connexion</h2>
      <span className="section__subtitle">Choisissez une méthode de connexion</span>

      <div className="auth__list-content">
        <ul className="auth__list">
          <li className="auth__item">
            <Link to={`email`} className="auth__link">
              <div className="auth__icon-container">
                <UilEnvelope className="auth__icon" />
              </div>
              <div className="auth__info">
                <h3 className="auth__name">Email</h3>
              </div>
            </Link>
          </li>

          <li className="auth__item">
            <div>
              <div className="auth__link">
                <div className="auth__icon-container" style={{ backgroundColor: '#0078D7' }}>
                  <UilMicrosoft className="auth__icon" />
                </div>
                <div className="auth__info">
                  <h3 className="auth__name">Microsoft</h3>
                </div>
              </div>
            </div>
          </li>

          <li className="auth__item">
            <div>
              <div className="auth__icon-container" style={{ backgroundColor: '#EA4134' }}>
                <UilGoogle className="auth__icon" />
              </div>
              <div className="auth__info">
                <h3 className="auth__name">Google</h3>
              </div>
            </div>
          </li>


          <li className="auth__item">
            <Link to="facebook" className="auth__link">
              <div className="auth__icon-container" style={{ backgroundColor: '#4566AD' }}>
                <UilFacebook className="auth__icon" />
              </div>
              <div className="auth__info">
                <h3 className="auth__name">Facebook</h3>
              </div>
            </Link>
          </li>

          <li className="auth__item">
            <Link to="apple" className="auth__link">
              <div className="auth__icon-container" style={{ backgroundColor: '#000' }}>
                <UilApple className="auth__icon" />
              </div>
              <div className="auth__info">
                <h3 className="auth__name">Apple</h3>
              </div>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
};
