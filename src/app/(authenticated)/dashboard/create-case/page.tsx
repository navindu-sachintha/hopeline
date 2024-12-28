"use client"
import { Button } from "@/components/ui/button";
import { CreateCaseForm } from "@/components/userDash/CreatecaseForm";
import { useRouter } from "next/navigation";

export default function CreateCasepage() {
    const router = useRouter();
    return (
        <div className="container px-12 lg:px-32 py-12 lg:py-20">  
            <Button className="mb-4" onClick={() => router.back()}>Back</Button>
            <CreateCaseForm />
        </div>
    )
}