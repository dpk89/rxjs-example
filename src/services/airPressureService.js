import { Subject } from "rxjs";

const subject = new Subject();

export const airPressureService = {
  setData: (data) => subject.next(data),
  onData: () => subject.asObservable(),
};
