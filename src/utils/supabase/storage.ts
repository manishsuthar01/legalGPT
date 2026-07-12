import { supabase } from "./client";

export async function uploadContract(file: File, userId: string) {
    try {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileExtension = file.name.split('.').pop();
        const fileName = `${userId}/${uniqueSuffix}.${fileExtension}`;

        const { data, error } = await supabase.storage
            .from('contracts')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        return {
            success: true,
            path: data.path,
        };
    }
    catch (error) {
        console.error('Error uploading contract:', error);
        return {
            success: false,
            error
        };
    }
}