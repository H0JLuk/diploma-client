export type Question = {
  id: number;
  text: string;
  image: string;
  type: keyof typeof QuestionTypeEnum;
  category?: QuestionCategory;
  categoryId: number;
  answers?: Answer[];
};

export enum QuestionTypeEnum {
  single = 'single',
  multiple = 'multiple',
  input = 'input',
}
