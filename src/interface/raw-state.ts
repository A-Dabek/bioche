export interface RawState {
  name: string;
  values: {[k: string]: any};
  present: {key: string, value: string}[];
}