export interface ResponseBody<T> {
  kind: 'single' | 'multi'
  singleResult?: { data: T; errors: { message: string }[] }
}
