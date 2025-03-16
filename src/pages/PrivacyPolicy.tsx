
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-foreground/80 mb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                At Attendly, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when 
                you use our attendance management system.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>
                  <strong>Personal Information:</strong> Name, email address, profile picture, and other details 
                  necessary for identification within the system.
                </li>
                <li>
                  <strong>Biometric Data:</strong> Facial recognition data used exclusively for attendance verification
                  purposes. This data is processed with the highest level of security and privacy protection.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information on how you interact with our platform, including 
                  login times, features used, and system preferences.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about the devices you use to access our service,
                  including IP address, browser type, and operating system.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>To provide and maintain our attendance management service</li>
                <li>To verify your identity for attendance tracking</li>
                <li>To generate attendance reports and analytics</li>
                <li>To improve and personalize user experience</li>
                <li>To communicate with you about service updates or changes</li>
                <li>To detect and prevent fraudulent activity or misuse of our service</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement robust security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Encryption of sensitive data both in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Strict access controls and authentication procedures</li>
                <li>Secure storage of biometric templates using industry-standard methods</li>
                <li>Regular backup procedures to prevent data loss</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this Privacy Policy, unless a longer retention period is required by law. 
                Biometric data is retained for the duration of your enrollment or employment with the 
                institution using our system, after which it is securely deleted.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict or object to processing of your data</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Sharing</h2>
              <p>
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>The educational institution or organization that has subscribed to our service</li>
                <li>Service providers who assist us in operating our platform</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. 
                You can control cookie settings through your browser preferences.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Children's Privacy</h2>
              <p>
                Our service is not intended for individuals under the age of 16, unless specifically authorized 
                by their educational institution and with appropriate parental or guardian consent.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any significant 
                changes by posting the new policy on this page and updating the "Last Updated" date.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@attendly.com<br />
                <strong>Address:</strong> 123 Education Street, Tech City, TC 12345
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
