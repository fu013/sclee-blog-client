export interface iPost {
  pk: number;
  title: string;
  html: string;
  markdown: string;
  isPublic: string;
  isReview: string;
  description: string;
  tags: string;
  comment: null | any;
  updatedDate: string;
  createdDate: string;
}
