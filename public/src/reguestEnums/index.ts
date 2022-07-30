export enum RequestPostEnum {
    LOGIN = "auth/login",
    REGISTRATION = "auth/registration",
    CREATE_ENTRY = "entry/create"
}

export enum RequestGetEnum {
    AUTH = "auth/check",
    ENTRIES = "entry/",
    ENTRY = "entry"
}

export enum RequestDeleteEnum {
    DELETE_ENTRY = "entry",
    DELETE_FILE = "entry/delete-file"
}

export enum RequestPutEnum {
    UPDATE_ENTRY = "entry"
}