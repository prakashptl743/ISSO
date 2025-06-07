export interface Assignment {
  studentId: number;
  subgameId: number;
  assignmentDate: Date; // To track when the assignment was made (optional, but good for "yesterday's data")
}
