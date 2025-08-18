declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export const meta: {
    title: string
    date?: string
    tags?: string[]
    excerpt?: string
    role?: string
    stack?: string[]
    repo?: string
    demo?: string
    cover?: string
    categories?: Array<{
      name: string
      items: string[]
    }>
  }
  export default MDXComponent
}
