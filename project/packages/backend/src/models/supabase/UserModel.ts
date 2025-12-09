import { supabase } from './supabaseClient';
import { UserRow, Database } from './types';

export class UserModel {
  static async checkEmailAndSlugNotDuplicated(
    email: string,
    slug: string,
    id: number
  ): Promise<UserRow | null> {
    const { data, error } = await supabase
      .from('devlinks_users')
      .select('*')
      .or(`email.eq.${email},slug.eq.${slug}`)
      .neq('id', id ?? 0)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // ignore not found
    return data || null;
  }

  static async findByEmail(email: string): Promise<UserRow | null> {
    const { data, error } = await supabase
      .from('devlinks_users')
      .select('*')
      .eq('email', email)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  static async findBySlug(slug: string): Promise<UserRow | null> {
    const { data, error } = await supabase
      .from('devlinks_users')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  static async findById(id: number): Promise<Partial<UserRow> | null> {
    const { data, error } = await supabase
      .from('devlinks_users')
      .select('email, first_name, last_name, slug, avatar_url, id')
      .eq('id', id)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  static async create(user: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    slug: string;
    avatar_url?: string;
  }): Promise<UserRow> {
    const insertData: Database['public']['Tables']['devlinks_users']['Insert'] =
      {
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        slug: user.slug,
        avatar_url: user.avatar_url ?? null,
      };

    const { data, error } = await supabase
      .from('devlinks_users')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(user: {
    id: number;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    slug: string;
    avatar_url?: string | null;
    avatar_public_id?: string | null;
  }): Promise<UserRow> {
    const updateData: Database['public']['Tables']['devlinks_users']['Update'] =
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        slug: user.slug,
        avatar_url: user.avatar_url ?? null,
        avatar_public_id: user.avatar_public_id ?? null,
      };

    if (user.password) updateData.password = user.password;

    const { data, error } = await supabase
      .from('devlinks_users')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteOne(email: string): Promise<number> {
    const { count, error } = await supabase
      .from('devlinks_users')
      .delete({ count: 'exact' })
      .eq('email', email);

    if (error) throw error;
    return count ?? 0;
  }

  static async incrementTokenVersion(userId: number): Promise<void> {
    const { error } = await supabase
      .from('devlinks_users')
      .update({ token_version: supabase.raw('token_version + 1') })
      .eq('id', userId);

    if (error) throw error;
  }
}
