// // validations/signUp.js
// import * as Yup from 'yup';

// export const signUpStep1Schema = Yup.object().shape({
//   firstname: Yup.string().required('First name is required'),
//   lastname: Yup.string().required('Last name is required'),
//   phoneNo: Yup.string().required('Phone number is required'),
//   age: Yup.number().required('Age is required').positive().integer(),
// });

// export const signUpStep2Schema = Yup.object().shape({
//   address: Yup.object().shape({
//     street: Yup.string().required('Street is required'),
//     city: Yup.string().required('City is required'),
//     state: Yup.string().required('State is required'),
//     zipCode: Yup.string().required('Zip Code is required'),
//     country: Yup.string().required('Country is required'),
//   }),
// });

// export const signUpStep3Schema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string().required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
// });