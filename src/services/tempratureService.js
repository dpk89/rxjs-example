import { Subject } from "rxjs";

const subject = new Subject();

export const tempratureService = {
  setData: (data) => subject.next(data),
  onData: () => subject.asObservable(),
};
