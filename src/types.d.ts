type UserLoginData = { username: string; password: string }
type User = { id: number | string; fname: string; lname: string; username: string; password: string }
declare module '*.css'
declare module '*.jpg'
declare module '*.png'
declare module '*.scss'
declare module 'textures'
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
