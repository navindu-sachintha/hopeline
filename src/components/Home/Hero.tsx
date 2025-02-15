"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const slides: Slide[] = [
  {
    id: 1,
    image: "/hero1.jpeg",
    title: "Stand Against Cyberbullying",
    description: "Report incidents and help create a safer online environment for everyone.",
  },
  {
    id: 2,
    image: "/hero2.jpeg",
    title: "Your Voice Matters",
    description: "Speak up against online harassment and make a difference.",
  },
  {
    id: 3,
    image: "/hero3.jpeg",
    title: "Together We Can Stop Cyberbullying",
    description: "Join us to make the university a safer place for everyone.",
  },
]
export const Hero = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">{slide.title}</h1>
            <p className="text-xl md:text-2xl max-w-2xl text-center mb-8">{slide.description}</p>
            <div className="flex space-x-4">
              <Button size='lg' variant="default" onClick={() => router.push("/report")}>
                Speak to Us
              </Button>
              <Button size='lg' variant='outline' className="text-black" onClick={() => router.push("/awareness")}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}