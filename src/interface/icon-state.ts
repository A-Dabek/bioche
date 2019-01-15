export interface IconState<T> {
  name: string;
  getValue(): T;
  presentationValue: (value: T) => string;
}
