export interface Inputs {
  // [x: string]: Date | string | { start: Date; end: Date };
  createDate: Date;
  title: string;
  desc: string;
  morning: string;
  lunch: string;
  dinner: string;
  snack: string;
  nutrients: string;
  sleepTimeStart: Date;
  sleepTimeEnd: Date;
  // sleepTime: { start: Date; end: Date };
  exercise: string;
  review: string;
}
