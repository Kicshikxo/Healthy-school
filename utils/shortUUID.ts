import short from 'short-uuid'

const translator = short()

export const shortUUID = (uuid: string) => translator.fromUUID(uuid)
export const parseUUID = (shortUUID: string) => translator.toUUID(shortUUID)
