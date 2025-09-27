// Client-side KV store utilities
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Создаем клиент с обработкой ошибок
let supabase: any = null;

try {
  supabase = createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  );
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
}

// Set stores a key-value pair in the database.
export const set = async (key: string, value: any): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { error } = await supabase.from("kv_store_c602aa03").upsert({
    key,
    value
  });
  if (error) {
    throw new Error(error.message);
  }
};

// Get retrieves a key-value pair from the database.
export const get = async (key: string): Promise<any> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { data, error } = await supabase.from("kv_store_c602aa03").select("value").eq("key", key).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data?.value;
};

// Delete deletes a key-value pair from the database.
export const del = async (key: string): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { error } = await supabase.from("kv_store_c602aa03").delete().eq("key", key);
  if (error) {
    throw new Error(error.message);
  }
};

// Sets multiple key-value pairs in the database.
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { error } = await supabase.from("kv_store_c602aa03").upsert(keys.map((k, i) => ({ key: k, value: values[i] })));
  if (error) {
    throw new Error(error.message);
  }
};

// Gets multiple key-value pairs from the database.
export const mget = async (keys: string[]): Promise<any[]> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { data, error } = await supabase.from("kv_store_c602aa03").select("value").in("key", keys);
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};

// Deletes multiple key-value pairs from the database.
export const mdel = async (keys: string[]): Promise<void> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { error } = await supabase.from("kv_store_c602aa03").delete().in("key", keys);
  if (error) {
    throw new Error(error.message);
  }
};

// Search for key-value pairs by prefix.
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  const { data, error } = await supabase.from("kv_store_c602aa03").select("key, value").like("key", prefix + "%");
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};