export const STRINGS = {
  firstNameErrorMsg: 'First name can only have characters and min 3 letters',
  lastNameErrorMsg: 'Last name can only have characters and min 3 letters',
  phoneNoErrorMsg: 'Enter a valid 10 digit phone number',
  emailErrorMsg: 'Enter a valid email Id',
  passwordErrorMsg:
    'A valid password should have characters, number, special character and min 1 number',
  confirmPasswordErrorMsg: 'Passwords do not match.',
  yearOfPassing: 'Year of passing can only have numbers',
  grade: 'Grade can have only number and characters',
  experience: 'Experience can only have numbers',
  designation: 'Designation can have only number and characters',
  domain: 'Domain can have only number and characters',
};
export const REGEX = {
  name: /[A-Za-z]{3,}$/,
  onlyCharacter: /[A-Za-z]*$/,
  onlyNumber: /^[0-9]+$/,
  TenDigitNumber: /^[0-9]{10}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  characterAndNumber: /^[a-zA-Z0-9 ]*$/
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
