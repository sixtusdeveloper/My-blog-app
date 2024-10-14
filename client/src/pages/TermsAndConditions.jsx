import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="w-full pt-20 bg-white dark:bg-[rgb(16,23,42)]">
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
            <p className="mb-4"><strong>Effective Date:</strong> 14th October, 2024</p>
            <p className="mb-4">
                Welcome to DevJourney! By accessing or using my blog application, you agree to comply with these Terms & Conditions. Please read them carefully.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
                By using DevJourney, you acknowledge that you have read, understood, and agreed to these terms. If you do not agree, please do not use the website.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Accuracy of Information:</strong> You are responsible for ensuring the accuracy of the information you provide.</li>
                <li><strong>Content Posting:</strong> If you wish to post content, you must contact me so I may grant you access as an admin.</li>
                <li><strong>Respectful Behavior:</strong> Users must not post offensive, harmful, or illegal content. I reserve the right to remove any such content.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Intellectual Property</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>My Content:</strong> All content, including articles, logos, and images, belongs to DevJourney and is protected by copyright laws.</li>
                <li><strong>Your Content:</strong> If you post on my platform, you retain ownership of your content. By posting, you grant me a non-exclusive right to use and display it.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. User Accounts</h2>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Admin Access:</strong> To gain admin rights and post content, contact me through the form or the provided communication platforms on the Contact page.</li>
                <li><strong>Account Security:</strong> Users are responsible for maintaining the security of their accounts.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Prohibited Activities</h2>
            <p className="mb-4">
                Users must not:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Post unauthorized or misleading content</li>
                <li>Use the blog for illegal activities</li>
                <li>Attempt to hack or disrupt the website</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Third-Party Links</h2>
            <p className="mb-4">
                My blog may contain links to other websites. I'm not responsible for the content or practices of third-party sites.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
                I strive to provide accurate and up-to-date information, but I'm not liable for any errors, inaccuracies, or omissions in my content. Use the blog at your own risk.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">8. Termination ❌</h2>
            <p className="mb-4">
                I reserve the right to suspend or terminate any user’s access to the website if they violate these Terms & Conditions.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">9. Governing Law</h2>
            <p className="mb-4">
                These terms shall be governed by the laws of Nigeria/Lagos, without regard to its conflict of law principles.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">10. Changes to Terms & Conditions</h2>
            <p className="mb-4">
                I may update these terms from time to time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">11. Contact Me</h2>
            <p className="mb-4">
                If you have any questions about these Terms & Conditions, please contact me:
            </p>
            <p>📧 <strong>Email:</strong> sixtusushrey@gmail.com</p>
            <p>📱 <strong>Phone:</strong> +234 902 2048 105</p>

            <div className='my-8'>
              <a href="/privacy-policy" className='text-green-500 hover:text-blue-500'>Visit the privacy policy of this site...</a>
            </div>
        </div>
    </section>
  );
};

export default TermsAndConditions;
