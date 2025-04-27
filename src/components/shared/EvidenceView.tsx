import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Roles } from '@/types/globals'
import axios from 'axios'
import { extractText } from '@/lib/textExtractor'

interface EvidenceViewProps {
    urls: string[]
    role:Roles
}

interface VerificationResult {
    label: string;
    score: number;
    is_toxic: boolean;
}

const EvidenceView = ({urls,role}: EvidenceViewProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVerifyOpen, setIsVerifyOpen] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false); // Loading state
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    
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

    const handleVerifyClick = async () => {
        setIsVerifying(true);
        setVerificationResult(null); // Reset previous result
        setVerificationError(null); // Reset previous error

        try {
            // --- Simulate API Call ---
            // Replace this with your actual fetch/axios call
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
            const mockResponse = {
                ok: true, // Simulate a successful response status
                json: async () => ({ // Simulate the json() method
                    label: "toxic",
                    score: 0.9997726082801819,
                    is_toxic: true
                }),
            };
            // --- End Simulation ---
            let extractedText = ''
            for (const url of urls) {
                const text = await extractText(url)
                extractedText += text
            }
            // Example using actual fetch:
            const response = await axios.post('/api/evidenceVerify',{
                text: extractedText
            })

            // Check if the response was successful
            if (!mockResponse.ok) { // Use !response.ok for actual fetch
                throw new Error(`API Error: ${!mockResponse.ok || 'Verification failed'}`);
            }

            const data: VerificationResult = await mockResponse.json(); // Use await response.json() for actual fetch
            setVerificationResult(data);

        } catch (error) {
            console.error("Verification failed:", error);
            setVerificationError(error instanceof Error ? error.message : "An unknown error occurred during verification.");
        } finally {
            setIsVerifying(false); // Stop loading indicator
        }
    };

    const handleVerifyDialogClose = (open: boolean) => {
        setIsVerifyOpen(open);
        if (!open) {
            // Reset state when closing the dialog
            setIsVerifying(false);
            setVerificationResult(null);
            setVerificationError(null);
        }
    };
    
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
                    {role == 'admin' ?
                    <Button className='mt-4' onClick={() => setIsVerifyOpen(true)}>
                        Verify Evidence
                    </Button> : null}

                    {/* Verify Evidence poppu dialog */}
                    <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Evidence Verification</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                {/* Loading State */}
                                {isVerifying && (
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                        <p className="text-muted-foreground">Verifying...</p>
                                    </div>
                                )}

                                {/* Error State */}
                                {!isVerifying && verificationError && (
                                    <div className="text-center text-red-600">
                                        <p>Error: {verificationError}</p>
                                        <Button variant="outline" className="mt-4" onClick={handleVerifyClick}>
                                            Retry Verification
                                        </Button>
                                    </div>
                                )}

                                {/* Success State */}
                                {!isVerifying && verificationResult && (
                                    <div className="space-y-2">
                                        <p className="text-lg font-medium text-center text-green-600">Verification Complete</p>
                                        <p><span className="font-semibold">Label:</span> {verificationResult.label}</p>
                                        <p><span className="font-semibold">Score:</span> {verificationResult.score.toFixed(4)}</p>
                                        <p><span className="font-semibold">Is Toxic:</span> {verificationResult.is_toxic ? 'Yes' : 'No'}</p>
                                    </div>
                                )}

                                {/* Initial State (Verify Button) */}
                                {!isVerifying && !verificationResult && !verificationError && (
                                    <div className="text-center">
                                        <p className="mb-4 text-muted-foreground">Click the button to start the verification process.</p>
                                        <Button onClick={handleVerifyClick}>
                                            Verify Evidence
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                {/* Optionally add a close button, though clicking outside or the default X works */}
                                <Button variant="outline" onClick={() => handleVerifyDialogClose(false)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

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