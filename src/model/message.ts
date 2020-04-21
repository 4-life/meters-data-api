import { Action } from './action';

export class Message {
  constructor(
    public content: string,
    public action: Action
  ) { }
}
