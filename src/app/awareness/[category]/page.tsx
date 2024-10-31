'use client'

import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { useBlogStore } from "@/store/blogStore";
import { BackButton, Breadcrumbs } from "@/components/shared";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { categories, posts, fetchCategories, fetchPosts } = useBlogStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      if (categories.length === 0) {
        await fetchCategories()
      }
      const category = categories.find(c => c.slug.current === params.category)
      if (category) {
        await fetchPosts(category._id)
      }
      setIsLoading(false)
    }
    loadData()
  }, [categories, fetchCategories, fetchPosts, params.category])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const category = categories.find(c => c.slug.current === params.category)
  if (!category) {
    return <div>Category not found</div>
  }

  const categoryPosts = posts[category._id] || []

  const breadcrumbItems = [
    { label: 'Awareness', href: '/awareness' },
    { label: category.title, href: `/awareness/${category.slug.current}` },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton/>
      <Breadcrumbs items={breadcrumbItems}/>
      <h1 className="text-3xl font-bold mb-8">{category.title}</h1>
      {categoryPosts.length === 0 ? (
        <p>No approved posts in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPosts.map((post) => (
            <Link key={post._id} href={`/awareness/${params.category}/${post.slug.current}`} className="block">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-48">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No cover image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600">{new Date(post.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}