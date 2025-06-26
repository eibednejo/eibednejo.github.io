import { supabase } from '../supabase/client';

export const fetchUserData = async (userId: string) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const manageSubscription = async (userId: string, subscriptionData: any) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .upsert({ user_id: userId, ...subscriptionData });

    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(file.name, file);

    if (error) {
        throw new Error(error.message);
    }
    return data;
};