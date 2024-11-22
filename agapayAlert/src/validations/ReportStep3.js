import * as Yup from 'yup';

export const ReportStep3Schema = Yup.object().shape({
  reporter: Yup.object().shape({
    relationship: Yup.string()
      .oneOf(["Parent", "Sibling", "Relative", "Friend", "Spouse", "Child", "Colleague", "Other"], 'Invalid relationship')
      .required('Relationship is required'),
  }),
  missingPerson: Yup.object().shape({
    lastKnownLocation: Yup.string().required('Last known location is required'),
    lastSeen: Yup.date().required('Last seen date is required'),
    causeOfDisappearance: Yup.string().required('Cause of disappearance is required'),
    images: Yup.array().of(
      Yup.object().shape({
        public_id: Yup.string(),
        url: Yup.string()
      })
    ).min(1, 'At least one image is required'),
  }),
});