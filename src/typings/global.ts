export interface CTX {
  app: Record<string, any>
  body: Record<string, any>
  request: {
    body: Record<string, any>
  }
  [k: string]: any
}

export type Next = () => Promise<any>
