import * as Yup from 'yup';

export const InformStep1Schema = Yup.object().shape({
    locationSeen: Yup.string().required('Location seen is required'),
    dateSeen: Yup.date().required('Date seen is required'),
    description: Yup.string().required('Description is required'),
});