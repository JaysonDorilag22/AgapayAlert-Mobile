import * as Yup from 'yup';

export const signUpStep2Schema = Yup.object().shape({
  address: Yup.object().shape({
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('Zip Code is required')
      .matches(/^\d{4}$/, 'Zip Code must be exactly 4 digits'),
    country: Yup.string().required('Country is required'),
  }),
});