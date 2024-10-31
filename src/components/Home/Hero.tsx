"use client"

import { Button } from "@/components/ui/button";
import IconCloud from "@/components/ui/icon-cloud";
import { useRouter } from "next/navigation";

const slugs = [
  "whatsapp",
  "viber",
  "facebook",
  "x",
  "linkedin",
  "line",
  "instagram",
  "snapchat",
  "telegram",
  "messenger",
  "imessage",
  "googlemessages"
]
export const Hero = () => {
  const router = useRouter()
  return (
    <>
      {/* Hero */}
      <div className="container px-12 lg:px-32 py-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl accent-tahiti-900 font-extrabold tracking-tight lg:text-5xl">
              HopeLine
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Keep Your Hopes Alive:
              We ensure your safety
            </p>
            {/* Buttons */}
            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Button
                onClick={() => router.push("/report")}
                size={"lg"}>Speak To Us</Button>
              <Button
                onClick={() => {router.push("/awareness")}}
                variant={"outline"} size={"lg"}>
                Get to know more
              </Button>
            </div>
            {/* End Buttons */}
          </div>
          {/* Col */}
          <div className="hidden xl:block relative ms-4">
            <IconCloud iconSlugs={slugs}/>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Hero */}
    </>
  );
}