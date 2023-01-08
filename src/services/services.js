import axios from "axios";
import config from "@/services/config.js";

axios.defaults.baseURL = config.baseURLApi;

export async function getAppliances(page,per_page,name,tension,brand) {
    const response = await axios.get(`/appliance`,{
        params: {
            paginate: true,
            page: page,
            per_page: per_page,
            name: name,
            tension: tension,
            brand: brand
        }
    });

    return response.data;
}

export async function showAppliance(id) {
    const response = await axios.get(`/appliance/${id}`);

    return response.data;
}

export async function createAppliance(name,description,tension,brand) {
    const response = await axios.post(`/appliance`,{
        name: name,
        description: description,
        tension: tension,
        brand: brand
    });

    return response.data;
}

export async function editAppliance(id,name,description,tension,brand) {
    const response = await axios.put(`/appliance/${id}`,{
        name: name,
        description: description,
        tension: tension,
        brand: brand
    });

    return response.data;
}

export async function deleteAppliance(id) {
    const response = await axios.delete(`/appliance/${id}`);

    return response.data;
}