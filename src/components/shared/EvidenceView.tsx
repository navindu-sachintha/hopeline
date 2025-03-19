import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface EvidenceViewProps {
    urls: string[]
}

const EvidenceView = ({urls}: EvidenceViewProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const handleImageClick = (url: string, index: number) => {
        setSelectedImage(url)
        setCurrentIndex(index)
    }

    const handlePrevious = () => {
        const newIndex = (currentIndex - 1 + urls.length) % urls.length
        setCurrentIndex(newIndex)
        setSelectedImage(urls[newIndex]!)
    }

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % urls.length
        setCurrentIndex(newIndex)
        setSelectedImage(urls[newIndex]!)
    }
    
    return (
        <section className="p-6 rounded-lg shadow">
            {urls.length > 0 ? (
                <div>
                    <h2 className="text-lg font-semibold mb-4">Evidence</h2>
                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4">
                        {urls.map((url, index) => (
                            <div 
                                key={index} 
                                className="relative aspect-square cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => handleImageClick(url, index)}
                            >
                                <Image
                                    src={url}
                                    alt={`Evidence ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                    width={200}
                                    height={200}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Image Popup Dialog */}
                    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                        <DialogContent className="max-w-[90vw] h-[90vh] p-0">
                            {selectedImage && (
                                <>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image
                                            src={selectedImage}
                                            alt="Selected evidence"
                                            className="max-w-full max-h-full object-contain"
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>
                                    {/* Navigation Buttons */}
                                    <div className="absolute inset-0 flex items-center justify-between p-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full  hover:bg-black/70"
                                            onClick={handlePrevious}
                                        >
                                            <ChevronLeft className="h-4 w-4 text-black" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full  hover:bg-black/70"
                                            onClick={handleNext}
                                        >
                                            <ChevronRight className="h-4 w-4 text-black" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            ) : (
                <p>No evidence available</p>
            )}
        </section>
    )
}

export default EvidenceView