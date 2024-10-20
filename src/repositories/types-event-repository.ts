import { ILocation } from "./types-location-repository.js"
import { IUser } from "./types-user-reposiotry.js"

export interface IEvent { 
  id:             string 
  name:           string
  slogan:         string
  description:    string
  numberOfGuests: number
  locationId:     string   
  location?:       ILocation 
  startDate:      Date
  endDate:       Date
  startTime:      Date
  endTime:        Date
  createdAt:      Date 
  updatedAt:      Date 
  managedById:    string
  managerBy?:      IUser     
  guestsId?:       IUser[]
}
