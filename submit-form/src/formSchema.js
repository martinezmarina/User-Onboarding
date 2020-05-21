import * as yup from 'yup'

const formSchema = yup.object().shape({
    first_name:yup.string()
    .trim()
    .required('First Name is Required'),
    last_name:yup.string()
    .trim()
    .required('Last Name is Required'),
    email: yup.string()
    .email('the email must be a valid email address')
    .required('the email is required'),
    password: yup.string()
    .trim()
    .min(7, 'The password must be at least seven characters long')
    .required('The password is required'),
    terms: yup.string()
    .required('Must read Terms and Services')
})
export default formSchema