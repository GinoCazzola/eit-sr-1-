import axios from "axios";

// Crear una instancia de axios con la base URL desde la variable de entorno
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API
})

// Función para obtener productos
export const getProducts = async () => {
    const resp = await axiosInstance.get("/products");
    return resp.data;
};

// Función para publicar un mensaje
export const postMessage = async body => {
    const resp = await axiosInstance.post("/messages", body);
    return resp.data;
};

// Función para publicar productos
export const postProducts = async body => {
    const resp = await axiosInstance.post("/products", body);
    return resp.data;
};

// Función para publicar productos con formulario
export const postFormProducts = async body => {
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
    });
    console.log('Form Data:', formData);
    const resp = await axiosInstance.post("/products", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return resp.data;
};

// Función para publicar un carrito
export const postCart = async body => {
    const resp = await axiosInstance.post("/cart", { items: body });
    return resp.data;
};

// Función para editar un carrito
export const editCart = async (id, body) => {
    const resp = await axiosInstance.put(`/cart/edit/${id}`, { items: body });
    return resp.data;
};

// Función para obtener un carrito
export const getCart = async id => {
    const resp = await axiosInstance.get(`/cart/get/${id}`);
    return resp.data;
};
