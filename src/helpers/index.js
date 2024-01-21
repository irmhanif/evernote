import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import * as yup from 'yup';

export const uuidv4 = () => {
    if (typeof window !== 'undefined') {
        return window.crypto.getRandomValues(new Uint32Array(1))[0];
    }
    return 0;
}


export const generateBasicNote = () => {
    return {
        id: uuidv4(),
        title: '',
        content: '',
        dateCreated: moment().format('MM-DD-YY HH:mm'),
        dateUpdated: moment().format('MMM DD YY HH:mm'),
        reminderDate: null,
        location: null,
        createdBy: 'admin',
        updatedBy: 'admin',
        description: '',
        canvas: '',
        audioLink: '',
        isActive: true,
        size: 0,
        url: '',
        tags: [],
        attachedImages: [],
        comments: []
    }
}

const getAuthToken = () => Cookies.get('token')

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your API base URL
    timeout: 5000, // Set a timeout for the request in milliseconds
    headers: {
        'Content-Type': 'application/json', // Set the content type of the request
        'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFhYzk5YzJiYzZhMTExY2M4YTMzMjYiLCJpYXQiOjE3MDU4NjkwMTYsImV4cCI6MTcwNTg3MjYxNn0.g2VQALGvKvkyZjs6mwN5r5ToBtiUkg5lKB7gO_O0fMQ` // Add the Authorization header with the token
    }
});

const createNote = (values) => {
    const apiUrl = '/api/resource';
    axiosInstance.post(apiUrl, values)
        .then(response => {
            // Handle successful response
            console.log(response);
        })
        .catch(error => {
            // Handle error
            console.error('Error fetching data:', error);
        });
}
export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            const newNote = generateBasicNote();
            createNote(newNote)
            sessionStorage.setItem('notes', JSON.stringify([...state, newNote]));
            return [...state, newNote];
        case 'UPDATE_NOTE':
            const updatedNotes = state.map((note) => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        ...action.payload.updatedNote,
                    };
                }
                return note;
            });
            sessionStorage.setItem('notes', JSON.stringify(updatedNotes));
            return updatedNotes;
        case 'DELETE_NOTE':
            const filteredNotes = state.filter((note) => note.id !== action.payload.id);
            sessionStorage.setItem('notes', JSON.stringify(filteredNotes));
            return filteredNotes;
        default:
            return state;
    }
};

export const getTimeOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
        return 'Morning';
    } else if (hour >= 12 && hour < 17) {
        return 'Afternoon';
    } else if (hour >= 17 && hour < 20) {
        return 'Evening';
    } else {
        return 'Night'
    }
}

export const calculateImageBrightness = (image) => {
    // Here, you can calculate the image brightness using image data.
    // This is a simplified example and may not be highly accurate.
    // You can find more advanced algorithms to calculate brightness.

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, image.width, image.height).data;
    let sum = 0;

    for (let i = 0; i < imageData.length; i += 4) {
        // Calculate brightness (a simple average of RGB values)
        sum += (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
    }

    return sum / (imageData.length / 4);
};


export const detectMobile = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth <= 768;
    }
    return false;
}

export const deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const createValidationSchema = (fields) => {
    const schema = {};

    fields.forEach((field) => {
        switch (field.name) {
            case 'email':
                schema[field.name] = yup
                    .string(`Enter your ${field.label.toLowerCase()}`)
                    .email(`Enter a valid ${field.label.toLowerCase()}`)
                    .required(`${field.label} is required`);
                break;
            case 'password':
                schema[field.name] = yup
                    .string(`Enter your ${field.label.toLowerCase()}`)
                    .min(field.min || 8, `${field.label} should be of minimum ${field.min || 8} characters length`)
                    .required(`${field.label} is required`);
                break;
            case 'confirmPassword':
                schema[field.name] = yup
                    .string(`Enter your ${field.label.toLowerCase()}`)
                    .oneOf([yup.ref('password')], 'Passwords must match')
                    .required(`${field.label} is required`);
                break;
            // You can add more cases for other types of fields if needed
            default:
                schema[field.name] = yup.string(`Enter your ${field.label.toLowerCase()}`).required(`${field.label} is required`);
                break;
        }
    });

    return yup.object(schema);
};

export const checkLoginStatus = () => {
    // Example: Check if the user is logged in based on some authentication state
    const token = Cookies.get('token')
    const isLoggedIn = token ? true : false;
    return isLoggedIn
};