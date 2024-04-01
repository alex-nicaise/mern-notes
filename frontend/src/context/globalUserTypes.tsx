export type userNotes = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  updated_at: string;
};

export type sessionUser = {
  name?: string;
  email?: string;
  notes?: userNotes[];
};
