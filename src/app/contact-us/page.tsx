"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, AlertCircle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactUs() {
    const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="shadow-lg">
        <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center text-primary">Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">Get In Touch</h2>
            </div>
            <p className="text-lg">
              Have questions, concerns, or feedback about Hopeline? We&apos;re here to help. Please reach out to us using any of the methods below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-4 transition-all hover:shadow-md">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:contact@navindu.online" className="text-primary hover:underline">
                      contact@navindu.online
                    </a>
                    <p className="text-sm text-muted-foreground">For general inquiries and support</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 transition-all hover:shadow-md">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a href="tel:+94712345678" className="text-primary hover:underline">
                      +94 71 234 5678
                    </a>
                    <p className="text-sm text-muted-foreground">Monday to Friday, 9am to 5pm</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 transition-all hover:shadow-md">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">NSBM Green University</p>
                    <p className="text-muted-foreground">Mahenwaththa, Pitipana</p>
                    <p className="text-muted-foreground">Homagama, Sri Lanka</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 transition-all hover:shadow-md">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Operating Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 2:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="space-y-4 bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-semibold">Emergency Support</h2>
            </div>
            <p className="text-lg">
              If you&apos;re experiencing an emergency related to cyberbullying or online harassment that requires immediate attention:
            </p>
            <ul className="list-none space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>For emotional support, please call our hotline at: </span>
                <a href="tel:+94114216062" className="font-medium text-primary hover:underline">+94 11 421 6062</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>For technical emergencies, email: </span>
                <a href="mailto:emergency@hopeline.lk" className="font-medium text-primary hover:underline">contact@navindu.online</a>
              </li>
              <li className="flex items-center gap-2 font-medium text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>In case of threats to safety, please contact local authorities immediately</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold">Reporting Cases</h2>
            </div>
            <p className="text-lg">
              To report a new case of cyberbullying or online harassment, please use our dedicated reporting system:
            </p>
            <div className="flex justify-center mt-6">
              <Button 
                size="lg" 
                className="font-medium text-lg py-6 px-8 hover:scale-105 transition-transform" 
                onClick={() => router.push('/report')}
              >
                Report a Case
              </Button>
            </div>
          </section>

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground text-center">
              The Hopeline team is committed to responding to all inquiries within 24-48 hours during business days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}