import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  data: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.data = eventData;
  }
}
