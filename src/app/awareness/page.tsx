import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import {urlFor} from "@/sanity/lib/image";
import { type Category } from "@/store/blogStore";

async function getCategories() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return client.fetch(`*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    ogImage
  }`)
}

export default async function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const categories:Category[] = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Select What you need to know..</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Suspense key={category._id} fallback={<div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>}>
            <Link href={`/awareness/${category.slug.current}`} className="block">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="relative h-48">
                  {category.ogImage ? (
                    <Image
                      src={urlFor(category.ogImage).url()}
                      alt={category.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                </div>
              </div>
            </Link>
          </Suspense>
        ))}
      </div>
    </div>
  )
}