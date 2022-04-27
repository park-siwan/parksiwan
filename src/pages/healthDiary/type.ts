type muiTextField = FileList | null;

export interface Inputs {
  // [x: string]: Date | string | { start: Date; end: Date };
  createDate: Date;
  title: string;
  desc: string;
  descImg: muiTextField;
  morning: string;
  morningPicture: muiTextField;
  lunch: string;
  lunchPicture: muiTextField;
  dinner: string;
  dinnerPicture: muiTextField;
  snack: string;
  snackPicture: muiTextField;
  nutrients: string;
  sleepTimeStart: Date;
  sleepTimeEnd: Date;
  exercise: string;
  review: string;
}
