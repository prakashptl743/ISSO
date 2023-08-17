export class School {
    id:number;
    name:string;
    board:string;
    address:string;
    schoolInfrastructure:string;
    email:string;
    mobile:string;
 }
  export class Event {
    preventDefault() {
      throw new Error("Method not implemented.");
}
    eventId:number;
    eventName:string;
    price:number;
    eventType:string;
    startDate:string;
    endDate:string;
    location:string;
    eventNote:string;
    eventDesc: string;
    event_status:string;
    defaultPrevented: any;
}
export class Game {
    gameId:number;  
    gameName: string;
    gameDescription: string;
    gameType: string;
    eleven_boys: number;
    eleven_girls:number;
    fourteen_boys:number;
    fourteen_girls:number;
    seventeen_boys:number;
    seventeen_girls: number;
    ninteen_boys:number;
    ninteen_girls: number
}
export class UpcomingEvent {
  id:number;
  event_name:string;
  event_desc:string;
}
export class Student {
  sId:number;
  studentName:string;
  fatherName:string;
  dateOfBirth:string;
  standardClass:string;
  ageRange:string;
  aadharNumber:string;
  gameName:string;
  subGameName:string;
  eventName:string;
  schoolName:string;
  createdDate:string;
  photo:string;
}