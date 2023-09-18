export interface IMainIdsType {
  id: number
  type: string
}

export interface IMainData {
  id: number
  type: string
  name: string | null,
  image: string
}

export interface ISpinoffData {
  id: number
  type: string
  name: string | null
  image: string
}

export interface IProducersIdsType {
  id: number
  type: string
}

export interface IProducersData {
  type: string
  name: string
  image: string
  url: string
}