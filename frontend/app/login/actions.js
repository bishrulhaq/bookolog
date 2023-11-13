'use server'
import { fetchRegister } from "@/utils";

export async function createAccount(prevState, formData) {

    try {
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        }

        const response = await fetchRegister(data);

        if (!response.ok) {
            return { error: response.message };
        }

        return { message: response.message };
    } catch (error) {

        console.error(error);
        return { error: 'Failed to create account' };
    }
};