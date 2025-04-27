import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Welcome to Hopeline. We are committed to protecting your privacy and handling your data in an open and transparent manner. This privacy policy explains how we collect, use, process, and store your personal information when you use our platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
            <h3 className="text-xl font-medium">2.1 Information you provide to us</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal information (name, email address, contact details)</li>
              <li>Account information when you register</li>
              <li>Reports of cyberbullying or harassment incidents</li>
              <li>Evidence uploads related to reported cases</li>
              <li>Communications between you and our support team</li>
            </ul>
            
            <h3 className="text-xl font-medium">2.2 Information collected automatically</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address for anonymous reports</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and maintain our service</li>
              <li>To process and manage reported cases</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you regarding your account or reports</li>
              <li>To analyze usage and improve our platform</li>
              <li>To detect, prevent, and address technical issues or abuse</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure storage of evidence uploads</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">5. Anonymous Reporting</h2>
            <p>
              Our platform allows anonymous reporting of incidents. When you choose to report anonymously:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We collect minimal identifying information necessary to process your report</li>
              <li>Your identity is not disclosed to reported parties</li>
              <li>We still collect certain technical information ( IP address) for security purposes</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">6. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Case information may be retained for longer periods to support ongoing investigations or as required by regulatory compliance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">7. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your personal information</li>
              <li>Restriction or objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">9. Third-Party Services</h2>
            <p>
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you interact with.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-2xl font-semibold">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium">Email: contact@navindu.online</p>
            <p className="font-medium">Address: NSBM Green University, Mahenwaththa, Pitipana, Homagama, Sri Lanka</p>
          </section>

          <p className="text-sm text-muted-foreground pt-4">Last Updated: April 25, 2025</p>
        </CardContent>
      </Card>
    </div>
  );
}