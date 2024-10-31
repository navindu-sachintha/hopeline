import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { client } from '@/sanity/lib/client'

interface Category {
  _id: string
  title: string
  slug: string
}

interface BlogPost {
  _id: string
  title: string
  slug: string
  mainImage: any
  publishedAt: string
  category: { _ref: string }
}

interface BlogState {
  categories: Category[]
  posts: Record<string, BlogPost[]>
  fetchCategories: () => Promise<void>
  fetchPosts: (categoryId: string) => Promise<void>
  clearStore: () => void
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      categories: [],
      posts: {},
      fetchCategories: async () => {
        const categories = await client.fetch(`*[_type == "category"] | order(title asc) {
          _id,
          title,
          slug
        }`)
        set({ categories })
      },
      fetchPosts: async (categoryId: string) => {
        if (get().posts[categoryId]) return
        const posts = await client.fetch(`*[_type == "post" && section._ref == $categoryId && approved == true] | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          category,
          approved
        }`, { categoryId })
        console.log('Fetched posts:', posts)
        set(state => ({ posts: { ...state.posts, [categoryId]: posts } }))
      },
      clearStore: () => set({ categories: [], posts: {} })
    }),
    {
      name: 'blog-storage'
    }
  )
)