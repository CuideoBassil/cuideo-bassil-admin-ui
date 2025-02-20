export interface Tag {
  _id: string;
  name: string;
}

export interface TagResponse {
  success: boolean;
  result: Tag[];
}

export interface TagDelResponse {
  success: boolean;
  message: string;
}

export interface IAddTag {
  name: string;
}

export interface ITagAddResponse {
  success: boolean;
  message: string;
  data: Tag;
}
