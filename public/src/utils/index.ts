export const isImage = (url: string): boolean => {
    const typeFile = url.split("/")[0]

    if (typeFile.includes("jpg") || typeFile.includes("jpeg") || typeFile.includes("png")) {
        return true
    }

    return false

}