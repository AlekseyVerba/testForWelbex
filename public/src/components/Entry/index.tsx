import React from "react"
import { IEntry } from "../../types/entry.interface"
import Entry from "./Entry"

const EntryWrapper: React.FC<IEntry> = (entry) => {

    return <Entry item={entry} />
}

export default EntryWrapper