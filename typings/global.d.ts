type UserInfoType = {
  id: string
  name: string
  realname: string
  password: string
  cellphone: string
  enable: number // 1表示启用，0表示禁用
  departmentId: number
  roleId: number
  offset?: number
  size?: number
  menuList?: Array<any>
  intro?: string
}

declare interface KoaCTX {
  app: Record<string, any>
  body: Record<string, any>
  request: {
    body: UserInfoType
  }
  [k: string]: any
}

type KoaNext = () => Promise<void>
