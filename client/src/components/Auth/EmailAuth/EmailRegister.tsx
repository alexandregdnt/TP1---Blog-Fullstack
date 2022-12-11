import React, {Dispatch, SetStateAction} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { TextField } from './TextField';
import { Alert } from '../../Common/Alert/Alert';

import { signIn } from '../../../features/auth.slice';

export const EmailRegister = ({ setAlert }: Props) => {
  const validate = Yup.object({
    firstname: Yup.string().max(16, '16 caractères maximum').required('Requis'),
    lastname: Yup.string().max(20, '20 caractères maximum').required('Requis'),
    email: Yup.string().email('Email invalide').required('Requis'),
    password: Yup.string()
      .min(6, 'Entre 6 et 18 caractères')
      .max(18, 'Entre 6 et 18 caractères')
      .required('Requis'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent être identiques')
      .required('Requis')
  });

  const handleSubmit = async (values: Values) => {
    console.log(values);
  };

  return (
      <Formik
          initialValues={{
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              confirm_password: ''
          }}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values as any)}>
          {() => (
              <Form className="auth__form grid">
                  <div className="auth__inputs grid">
                      <TextField label="Prénom" name="firstname" type="text" required autoFocus />
                      <TextField label="Nom" name="lastname" type="text" required />
                  </div>

                  <div className="auth__inputs grid">
                      <TextField label="Nom d'utilisateur" name="username" type="text" required />
                      <TextField label="Nom" name="lastname" type="text" required />
                  </div>

                  <TextField label="Email" name="email" type="email" required />
                  <TextField label="Mot de passe" name="password" type="password" required />
                  <TextField
                      label="Confirmer le mot de passe"
                      name="confirm_password"
                      type="password"
                      required
                  />

                  <div className="auth__button-container">
                      <button className="button" type="submit">
                          S'inscrire
                      </button>
                  </div>
              </Form>
          )}
      </Formik>
  );
};

interface Props {
    setAlert: Dispatch<SetStateAction<null>>;
}

interface Values {
    username: string;
    phone: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirm_password: string;
}
