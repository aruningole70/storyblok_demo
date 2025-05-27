export interface ImportedData {
  story: Story;
}

interface Story {
  name: string;
  created_at: string;
  published_at: string;
  updated_at: string;
  id: number;
  uuid: string;
  content: Content;
  slug: string;
  full_slug: string;
  sort_by_date: string;
  position: number;
  is_startpage: boolean;
  parent_id: string;
  meta_data: string;
  group_id: string;
  first_published_at: string;
  release_id: string;
  lang: string;
  path: string;
  default_full_slug: string;
  translated_slugs: string;
}

interface Content {
  _uid: string;
  component: string;
  _editable: string;
  body: PersonalDetails;
}

interface PersonalDetails {
  _uid: string;
  component: string;
  firstName: string;
  lastName: string;
  _editable: string;
}
