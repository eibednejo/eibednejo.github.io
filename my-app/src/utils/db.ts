import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../supabase/client';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchUserData = async (userId) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const manageSubscription = async (userId, subscriptionData) => {
    const { data, error } = await supabase
        .from('subscriptions')
        .upsert({ user_id: userId, ...subscriptionData });
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const uploadFile = async (file) => {
    const { data, error } = await supabase.storage
        .from('uploads')
        .upload(file.name, file);
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
};