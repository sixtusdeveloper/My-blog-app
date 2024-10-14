import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4"><strong>Effective Date:</strong> 14th October, 2024.</p>
            <p className="mb-4">
                At DevJourney, I prioritize your privacy and I'm committed to protecting your personal information. This Privacy Policy explains how I collect, use, disclose, and safeguard your data when you visit my blog or interact with me.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information I Collect</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Personal Information:</strong> When you sign up, comment, or contact me, I may collect:</li>
                <ul className="list-disc pl-6">
                <li>Name, email address, and phone number</li>
                <li>Social media handles (if you log in through third-party services)</li>
                </ul>
                <li><strong>Non-Personal Information:</strong> Your IP address, browser type, operating system, and browsing behavior on my website.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. How I Use Your Information</h2>
            <p className="mb-4">
                I use the collected information to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Provide, operate, and maintain the blog</li>
                <li>Respond to your inquiries, including support requests</li>
                <li>Send newsletters, updates, or promotional emails (with your consent)</li>
                <li>Allow registered users to create content or manage posts</li>
                <li>Improve my website’s performance and user experience</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
                I use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Enhance your browsing experience</li>
                <li>Analyze website traffic and usage</li>
                <li>Store your preferences for future visits</li>
            </ul>
            <p className="mb-4">
                You can disable cookies in your browser settings, but some features of the website may not work properly.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">
                I do not sell or trade your personal information. However, I may share your data with:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Service Providers:</strong> To help me manage the website and provide services (e.g., hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> If required by law or in response to valid legal requests</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
            <p className="mb-4">
                I implement industry-standard security measures to protect your personal data. However, no online platform is 100% secure, and I cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
            <p className="mb-4">
                You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Access, update, or delete your personal data</li>
                <li>Opt-out of newsletters or promotional emails at any time</li>
                <li>Withdraw your consent where processing depends on it</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">
                My blog may contain links to external websites. I'm are not responsible for the privacy practices or content of these third-party sites.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
                I may update this policy from time to time. I will notify you of significant changes by posting the revised policy on this page.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Me</h2>
            <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact me:
            </p>
            <p className="mb-2">📧 <strong>Email:</strong> sixtusushrey@gmail.com</p>
            <p>📱 <strong>Phone:</strong> +234 902 2048 105</p>

            <div className='my-8'>
              <a href="/terms-and-conditions" className='text-green-500 hover:text-blue-500'>Visit the Terms and conditions of this site...</a>
            </div>
        </div>

    </section>
  );
};

export default PrivacyPolicy;
