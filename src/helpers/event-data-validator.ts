import { IEvent } from "../repositories/event-repository.js"

export function EventDataValidator(event: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'>) {
  const { name, date, numberOfGuests, startTime, endTime } = event

  const now = new Date()

  function DeltaDateIsPositive(dateI: Date, dateII: Date) {
    if(dateI > dateII) return false
    return true
  }

  const dateIsvalid = DeltaDateIsPositive(now, date)
  const endTimeIsvalid = DeltaDateIsPositive(startTime, endTime)

  if(!name) throw new Error('The name indicated is invalid')
  if(!numberOfGuests || numberOfGuests < 0) throw new Error('The number of guests is invalid')  
  if(!dateIsvalid) throw new Error('The date indicated is invalid')
  if(!endTimeIsvalid) throw new Error('The end time indicated is invalid')
}