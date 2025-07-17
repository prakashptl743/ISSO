export class School {
  id: number;
  name: string;
  board: string;
  address: string;
  schoolInfrastructure: string;
  email: string;
  mobile: string;
  isAffiliate: string;
  isVoulnteer: string;
  originalPassword: string;
  author1: string;
  designation1: string;
  author2: string;
  designation2: string;
  gameCoach: string;
  schoolZone: string;
}
export class WebCalender {
  id: number;
  ageTitle: string;
  sportLocation: string;
  sportName: string;
  title: string;
  eventFile: string;
  eventStartDate: string;
  eventEndDate: string;
  reportingDate: string;
}
export class Event {
  gameId: any;
  gameType: string;
  game_name: string;
  ageRange: string;
  girlsageRange: string;
  preventDefault() {
    throw new Error("Method not implemented.");
  }
  eventId: number;
  eventName: string;
  price: number;
  eventType: string;
  eventZone: string;
  startDate: string;
  endDate: string;
  location: string;
  eventNote: string;
  description: string;
  event_status: string;
  note: string;
  defaultPrevented: any;
  certifiacteHeaderContent: string;
  certifiacteMainContent: string;
  extraTabRequired: string;
  extraTabValues: string;
}
export class Game {
  gameId: number;
  gameName: string;
  gameDescription: string;
  gameType: string;
  eleven_boys: number;
  eleven_girls: number;
  fourteen_boys: number;
  fourteen_girls: number;
  sixteen_boys: number;
  sixteen_girls: number;
  seventeen_boys: number;
  seventeen_girls: number;
  ninteen_boys: number;
  ninteen_girls: number;
  min_eleven_boys: number;
  min_eleven_girls: number;
  min_fourteen_boys: number;
  min_fourteen_girls: number;
  min_sixteen_boys: number;
  min_sixteen_girls: number;
  min_seventeen_boys: number;
  min_seventeen_girls: number;
  min_ninteen_boys: number;
  min_ninteen_girls: number;
}
export class SubGame {
  id: number;
  gameId: number;
  subGameName: string;
  gameName: string;
  gameType: string;
  eleven_boys: number;
  eleven_girls: number;
  fourteen_boys: number;
  fourteen_girls: number;
  sixteen_boys: number;
  sixteen_girls: number;
  seventeen_boys: number;
  seventeen_girls: number;
  ninteen_boys: number;
  ninteen_girls: number;
  min_eleven_boys: number;
  min_eleven_girls: number;
  min_fourteen_boys: number;
  min_fourteen_girls: number;
  min_sixteen_boys: number;
  min_sixteen_girls: number;
  min_seventeen_boys: number;
  min_seventeen_girls: number;
  min_ninteen_boys: number;
  min_ninteen_girls: number;
  ageRange: number;
  boyesCapacity: number;
  girlsCapacity: number;
  subgameId: number;
}
export class UpcomingEvent {
  id: number;
  event_name: string;
  event_desc: string;
}
export class Student {
  studentYear: string;
  sId: number;
  studentEvent: string;
  studentGame: string;
  studentSubGame: string;
  studentAge: number;
  studentGender: string;
  schoolName: string;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  admissionNumber: string;
  standardClass: string;
  aadharNumber: string;
  studentPhoto: string;
  ageRange: number;
  photo: string;
  schoolId: number;
  eventName: any;
  event_year: any;
  gender: any;
  gameName: any;
  subgameId: string;
  subGameName: string;
  gameId: number;
  gameType: string;
  eventId: number;
  tShirtSize: string;
  curruclm: string;
}
export class coachData {
  ageRange: number;
  coachAge: number;
  coachFatherName: string;
  coachGender: string;
  coachName: string;
  coachPhoto: string;
  eventID: number;
  eventName: string;
  gameName: string;
  game_id: number;
  id: number;
  schoolId: number;
  schoolName: string;
}
