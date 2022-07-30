import { Entry } from "./entry.entity"

export type ICreateOrUpdateEntityDto = Partial<Omit<Entry, "id" | "user" | "createdAt" | "files">>
export interface IGetEntries {
    items: Entry[]
    count: number
}