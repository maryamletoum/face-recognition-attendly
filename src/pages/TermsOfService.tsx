
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-foreground/80 mb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Attendly service ("Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p>
                Attendly provides an attendance management system with facial recognition technology 
                designed for educational institutions and organizations to track and manage attendance.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
              <p>
                To use certain features of the Service, you may need to register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update your account information if it changes</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
              <p>When using our Service, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Manipulate or falsify attendance records</li>
                <li>Share your account credentials with others</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property Rights</h2>
              <p>
                The Service and its original content, features, and functionality are owned by Attendly 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Subscription and Payments</h2>
              <p>
                Some aspects of the Service may require a subscription. By subscribing to our Service:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>You agree to pay all fees associated with your subscription plan</li>
                <li>Payment will be charged at the beginning of your subscription period</li>
                <li>Subscriptions automatically renew unless canceled before the renewal date</li>
                <li>No refunds will be issued for partial subscription periods</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Attendly shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use of or 
                inability to use the Service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Attendly and its officers, directors, employees, 
                and agents from any claims, damages, losses, liabilities, costs, or expenses arising from 
                your use of the Service or violation of these Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to the Service</h2>
              <p>
                Attendly reserves the right to modify, suspend, or discontinue the Service at any time 
                without notice. We will not be liable to you or any third party for any modification, 
                suspension, or discontinuation of the Service.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
              <p>
                We may revise these Terms from time to time. The most current version will always be 
                posted on our website. By continuing to use the Service after revisions become effective, 
                you agree to be bound by the revised Terms.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
                in which Attendly is established, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact Information</h2>
              <p>
                For any questions regarding these Terms, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> legal@attendly.com<br />
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

export default TermsOfService;
