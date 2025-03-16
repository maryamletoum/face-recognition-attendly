
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";

const CookiesPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-foreground/80 mb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit 
                a website. They are widely used to make websites work more efficiently and provide information 
                to the website owners. Cookies enhance user experience by remembering your preferences and 
                enabling certain website functions.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
              <p>
                At Attendly, we use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. 
                  They enable core functionality such as security, network management, and accessibility.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> These cookies allow us to remember your settings and preferences, 
                  such as language and region, to provide a more personalized experience.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our 
                  website by collecting and reporting information anonymously. This helps us improve our website.
                </li>
                <li>
                  <strong>Authentication Cookies:</strong> These cookies help us identify you when you log into our service 
                  so we can provide you with personalized features and services.
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Types of Cookies We Use</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">First-Party Cookies</h3>
              <p>
                These are cookies that are set by our website directly. They are used to maintain your session 
                and remember your preferences.
              </p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Cookies</h3>
              <p>
                These are cookies set by third parties that we partner with. These may include analytics providers 
                (like Google Analytics) that help us understand how users engage with our website.
              </p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Session Cookies</h3>
              <p>
                These are temporary cookies that are deleted when you close your browser. They help our website 
                remember what you've done on previous pages.
              </p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">Persistent Cookies</h3>
              <p>
                These cookies remain on your device even after you close your browser. They help our website 
                remember your preferences for future visits.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Specific Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full my-4 border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Provider</th>
                      <th className="py-2 px-4 text-left">Purpose</th>
                      <th className="py-2 px-4 text-left">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-4">session_id</td>
                      <td className="py-2 px-4">attendly.com</td>
                      <td className="py-2 px-4">Maintains your login session</td>
                      <td className="py-2 px-4">Session</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-4">pref_theme</td>
                      <td className="py-2 px-4">attendly.com</td>
                      <td className="py-2 px-4">Remembers your theme preference</td>
                      <td className="py-2 px-4">1 year</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-4">_ga</td>
                      <td className="py-2 px-4">Google Analytics</td>
                      <td className="py-2 px-4">Used to distinguish users</td>
                      <td className="py-2 px-4">2 years</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-4">_gid</td>
                      <td className="py-2 px-4">Google Analytics</td>
                      <td className="py-2 px-4">Used to distinguish users</td>
                      <td className="py-2 px-4">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Managing Cookies</h2>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Delete cookies that are already stored on your device</li>
                <li>Block the installation of new cookies</li>
                <li>Set your browser to notify you when you receive new cookies</li>
                <li>Disable cookies altogether</li>
              </ul>
              <p>
                Please note that if you choose to disable cookies, some features of our website may not function properly.
              </p>
              
              <h3 className="text-xl font-semibold mt-4 mb-2">How to Manage Cookies in Different Browsers:</h3>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Our Cookie Policy</h2>
              <p>
                We may update our Cookie Policy from time to time. Any changes will be posted on this page 
                with an updated "Last Updated" date. We encourage you to review this Cookie Policy periodically 
                for any changes.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at:
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

export default CookiesPolicy;
