import * as Yup from 'yup';

export const InformStep2Schema = Yup.object().shape({
    identificationId: Yup.object().shape({
        category: Yup.string()
        .oneOf(['School ID', 'Barangay ID', 'Government ID'], 'Invalid category')
        .required('Category is required'),
    }),
});