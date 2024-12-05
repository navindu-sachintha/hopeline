import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import {urlFor} from "@/sanity/lib/image";
import { type Category } from "@/store/blogStore";
import { Card, CardHeader, CardContent } from "@/components/ui/card"

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
            <Link href={`/awareness/${category.slug.current}`} className="block transition-all hover:scale-[1.02]">
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative aspect-video">
                    {category.ogImage ? (
                      <Image
                        src={urlFor(category.ogImage).url()}
                        alt={category.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image available</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardHeader>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </CardHeader>
              </Card>
            </Link>
          </Suspense>
        ))}
      </div>
    </div>
  )
}