interface Fact {
  [key: string]: string
}

export interface IStatsState {
  birthday: string | null
  age: string | null
  height: string | null
  weight: string | null
  factOne: Fact | null
  factTwo: Fact | null
}