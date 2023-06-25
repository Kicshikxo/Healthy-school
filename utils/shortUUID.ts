import short from 'short-uuid'

const translator = short()

export const shortUUID = (uuid: string) => {
    try {
        return translator.fromUUID(uuid)
    } catch(e) {
        return translator.fromUUID('')
    }
}
export const parseUUID = (shortUUID: string) => {
    try {
        return translator.toUUID(shortUUID)
    } catch(e) {
        return translator.toUUID('')
    }
}
