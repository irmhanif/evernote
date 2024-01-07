import moment from "moment";

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
export const notesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            const newNote = generateBasicNote();
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