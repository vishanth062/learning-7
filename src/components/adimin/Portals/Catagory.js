// catagary.js
const catagary = async () => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Bad API call', error);
        return []; // Return an empty array or handle the error as needed
    }
};

export default catagary;
