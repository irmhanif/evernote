export const loginFields = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password', min: 8 },
    // Add more fields as needed
];

export const signUpFields = [
    { name: 'name', type: 'text', label: 'Name', autoFocus: false },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password', min: 8 },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password', min: 8 },
]