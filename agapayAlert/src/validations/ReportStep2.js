import * as Yup from 'yup';

export const ReportStep2Schema = Yup.object().shape({
    missingPerson: Yup.object().shape({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        age: Yup.number().required('Age is required'),
        assignedSexAtBirth: Yup.string()
          .oneOf(["Male", "Female"], 'Sex at Birth must be either Male or Female')
          .required('Sex at Birth is required'),
    }),
});
