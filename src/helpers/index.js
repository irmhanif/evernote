
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