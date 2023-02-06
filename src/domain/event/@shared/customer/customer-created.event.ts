import EventInterface from "../event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  data: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.data = eventData;
  }
}
