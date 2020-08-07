import { Subject } from "rxjs";

const subject = new Subject();

export const humidityService = {
  setData: (data) => subject.next(data),
  onData: () => subject.asObservable(),
};
