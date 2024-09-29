import * as Yup from 'yup';

export const signUpStep1Schema = Yup.object().shape({
  firstname: Yup.string().required('First name is required'),
  lastname: Yup.string().required('Last name is required'),
  phoneNo: Yup.string()
    .matches(/^(\+63|0)9\d{9}$/, 'Phone number is not valid')
    .required('Phone number is required'),
    age: Yup
    .number("Enter your age")
    .required("Age is required")
    .min(13, "Age should be of minimum 13 years"),
});