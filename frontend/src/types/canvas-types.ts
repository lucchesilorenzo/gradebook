export type Desk = {
  student_id: string;
  student_first_name: string;
  student_last_name: string;
  x: number;
  y: number;
};

export type DrawingToolExtended = {
  name: string;
  color: string;
  size: number;
  points: number[][];
};
