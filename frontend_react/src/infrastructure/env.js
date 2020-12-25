import { Platform } from 'react-native'

const ENVS = {
  WEB: "web",
  IOS: "ios",
  ANDROID:"android"
}

const is_env = platform => Platform.OS === platform.trim().toLowerCase()

export const is_android = () => is_env(ENVS.ANDROID)
export const is_ios = () => is_env(ENVS.IOS)
export const is_web = () => is_env(ENVS.WEB)


const IS = {
  ANDROID: is_android(),
  IOS: is_ios(),
  WEB: is_web()
}

export default IS

