import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import {urlFor} from '@/sanity/lib/image'
import { BackButton } from "@/components/shared";
import { type BlogPost } from "@/store/blogStore";

async function getPost(slug: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return client.fetch(`*[_type == "post" && slug.current == $slug && approved == true][0] {
    title,
    mainImage,
    content,
    slug,
    publishedAt,
    author->{
      name,
      image,
      bio
    },
    section->{
      title
    }
  }`, { slug })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const post:BlogPost = await getPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <article className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
            {post.mainImage ? (
              <Image
                src={urlFor(post.mainImage).url()}
                alt={post.title}
                width={1200}
                height={250}
                className="rounded-lg"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No cover image available</span>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8 flex items-center">
          {post.author.image ? (
            <Image
              src={urlFor(post.author.image).url()}
              alt={post.author.name}
              width={50}
              height={50}
              className="mr-4 rounded-full"
            />
          ) : (
            <div className="mr-4 h-[50px] w-[50px] rounded-full bg-gray-200"></div>
          )}
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-gray-600">
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument */}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="prose max-w-none">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <PortableText value={post.content} />
        </div>
      </article>
    </div>
  );
}