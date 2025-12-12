const useSupabase = true;

export const UserModel = useSupabase
  ? require('./supabase/UserModel').UserModel
  : require('./postgress/UserModel').UserModel;

export const LinkModel = useSupabase
  ? require('./supabase/LinkModel').LinkModel
  : require('./postgress/LinkModel').LinkModel;
