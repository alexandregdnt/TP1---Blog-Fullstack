import React, {Dispatch, SetStateAction} from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { TextField } from './TextField';
import {login, signInInput} from '../../../features/auth.slice';

export const EmailLogin = ({ setAlert }: Props) => {

  const validate = Yup.object({
    email: Yup.string().email('Email invalide').required('Requis'),
    password: Yup.string().required('Requis')
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  // TODO: Change handleSubmit param to signInInput key
  return (
      <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validate}
          onSubmit={(values) => handleSubmit(values)}>
        {() => (
            <div>
              <Form className="auth__form grid">
                <TextField label="Nom d'utilisateur, Email, Téléphone" name="authentification_method" type="text" required autoFocus />
                <TextField label="Mot de passe" name="password" type="password" required />

                <div className="auth__button-container">
                  <button className="button" type="submit">
                    Se connecter
                  </button>
                </div>
              </Form>
            </div>
        )}
      </Formik>
  );
};

interface Props {
    setAlert: Dispatch<SetStateAction<null>>;
}
