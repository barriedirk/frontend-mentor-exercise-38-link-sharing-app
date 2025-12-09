export interface LinkRow {
  id: number;
  user_id: number;
  platform: string;
  url: string;
  position: number;
  created_at: string;
}

export interface UserRow {
  id: number;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  slug: string | null;
  avatar_url: string | null;
  avatar_public_id: string | null;
  token_version: number;
  created_at: string;
}

// Supabase public schema
// export interface Database {
//   public: {
//     Tables: {
//       devlinks_users: {
//         Row: UserRow;
//         Insert: Omit<
//           UserRow,
//           'id' | 'created_at' | 'avatar_public_id' | 'token_version'
//         > & { avatar_url?: string };
//         Update: Partial<Omit<UserRow, 'id' | 'created_at' | 'token_version'>>;
//         Relationships: [];
//       };
//       devlinks_links: {
//         Row: LinkRow;
//         Insert: Omit<LinkRow, 'id' | 'created_at'>;
//         Update: Partial<Omit<LinkRow, 'id' | 'created_at'>>;
//         Relationships: [];
//       };
//     };
//     // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//     Views: {};
//     // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//     Functions: {};
//     // eslint-disable-next-line @typescript-eslint/no-empty-object-type
//     Enums: {};
//   };
// }

export interface Database {
  public: {
    Tables: {
      devlinks_users: {
        Row: UserRow;
        Insert: Omit<
          UserRow,
          'id' | 'created_at' | 'avatar_public_id' | 'token_version'
        > & { avatar_url?: string };
        Update: Partial<Omit<UserRow, 'id' | 'created_at' | 'token_version'>>;
        Relationships: [];
      };
      devlinks_links: {
        Row: LinkRow;
        Insert: Omit<LinkRow, 'id' | 'created_at'>;
        Update: Partial<Omit<LinkRow, 'id' | 'created_at'>>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, unknown>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };

  graphql_public: Record<string, never>;
  auth: Record<string, never>;
  storage: Record<string, never>;
  realtime: Record<string, never>;
}
