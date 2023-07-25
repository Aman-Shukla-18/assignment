export const STRINGS = {
  firstNameErrorMsg: 'First name can only have characters and min 3 letters',
  lastNameErrorMsg: 'Last name can only have characters and min 3 letters',
  phoneNoErrorMsg: 'Enter a valid 10 digit phone number',
  emailErrorMsg: 'Enter a valid email Id',
  passwordErrorMsg:
    'A valid password should have characters, number, special character and min 1 number',
  confirmPasswordErrorMsg: 'Passwords do not match.',
};
export const REGEX = {
  name: /[A-Za-z]{3,}$/,
  onlyCharacter: /[A-Za-z]*$/,
  onlyNumber: '',
  TenDigitNumber: /^[0-9]{10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
export const educationOptions = [
  {label: 'Post Graduate', value: 'Post Graduate'},
  {label: 'Graduate', value: 'Graduate'},
  {label: 'HSC/Diploma', value: 'HSC/Diploma'},
  {label: 'SSC', value: 'SSC'},
];
export const stateOptions = [
  {label: 'Maharashtra', value: 'Maharashtra'},
  {label: 'Gujarat', value: 'Gujarat'},
  {label: 'Karnataka', value: 'Karnataka'},
  {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
  {label: 'Delhi', value: 'Delhi'},
  {label: 'Others', value: 'Others'},
];
