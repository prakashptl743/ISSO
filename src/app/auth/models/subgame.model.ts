export interface Subgame {
  id: number;
  name: string;
  minCapacity: number;
  assignedCount: number; // To track how many students are currently assigned
}
