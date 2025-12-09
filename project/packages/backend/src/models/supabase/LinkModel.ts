import { supabase } from './supabaseClient';
import { LinkRow } from './types';

export class LinkModel {
  static async findByUser(userId: number): Promise<LinkRow[]> {
    const { data, error } = await supabase
      .from('devlinks_links')
      .select('*')
      .eq('user_id', userId)
      .order('position', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async replaceLinks(
    userId: number,
    links: { platform: string; url: string; position?: number }[]
  ) {
    const { error: deleteError } = await supabase
      .from('devlinks_links')
      .delete()
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    if (links.length === 0) return;

    const insertData = links.map((link) => ({
      user_id: userId,
      platform: link.platform,
      url: link.url,
      position: link.position ?? 0,
    }));

    const { error: insertError } = await supabase
      .from('devlinks_links')
      .insert(insertData);

    if (insertError) throw insertError;
  }

  static async create(
    userId: number,
    link: { platform: string; url: string; position?: number }
  ): Promise<LinkRow> {
    const { data, error } = await supabase
      .from('devlinks_links')
      .insert([
        {
          user_id: userId,
          platform: link.platform,
          url: link.url,
          position: link.position ?? 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async update(
    linkId: number,
    userId: number,
    link: { platform?: string; url?: string; position?: number }
  ): Promise<LinkRow | null> {
    const updateData: Partial<LinkRow> = {};

    if (link.platform !== undefined) updateData.platform = link.platform;
    if (link.url !== undefined) updateData.url = link.url;
    if (link.position !== undefined) updateData.position = link.position;

    if (Object.keys(updateData).length === 0) return null;

    const { data, error } = await supabase
      .from('devlinks_links')
      .update(updateData)
      .eq('user_id', userId)
      .eq('id', linkId)
      .select()
      .single();

    if (error) return null;
    return data;
  }

  static async delete(linkId: number, userId: number): Promise<boolean> {
    const { count, error } = await supabase
      .from('devlinks_links')
      .delete({ count: 'exact' })
      .eq('id', linkId)
      .eq('user_id', userId);

    if (error) throw error;
    return (count ?? 0) > 0;
  }
}
