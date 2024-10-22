import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

// Inline CSS for background image
const backgroundStyle = {
  backgroundImage: 'url("/auth-bg.webp")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  overflowY: 'scroll',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
};

// Custom CSS for hidden scrollbar but scrollable content
const hideScrollbar = {
  overflowY: 'scroll',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
};


export default function DashboardAdminAccess() {
    const navigate = useNavigate();

    const handleNavigateAndScroll = (e) => {
      e.preventDefault();
  
      // Navigate to the contact page and scroll to the section after load
      navigate('/contact#contact-me');
    };

    return (
        <section style={backgroundStyle} className="min-h-[100vh] w-full overflow-auto md:pt-4">
            <div
                style={hideScrollbar}
                className="min-h-screen flex relative items-center justify-center p-2 md:p-8 mx-auto max-w-5xl"
            >
                <div className="py-10 rounded-lg">
                    <h1 className="text-4xl font-bold mb-6">
                        Admin Access Request 🔒
                    </h1>
                    <p className="text-lg mb-4">
                        Welcome! If you’re here to request <strong>admin privileges</strong>, please read the following guidelines carefully.
                        Becoming an admin gives you the responsibility and privilege to contribute by writing posts and publishing them online.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-3">Guidelines for Admins</h2>
                    <ul className="list-disc ml-5 space-y-3 text-lg">
                        <li>
                        <h3 className="font-semibold">Post Creation</h3>
                        As an admin, you will be authorized to create posts and publish them.
                        Every post must align with our platform’s goals, policies, and values.
                        </li>
                        <li>
                        <h3 className="font-semibold">Ownership and Consent</h3>
                        <span className="font-semibold">
                            Do not delete or update posts created by others without explicit permission ⚠
                        </span><br />
                        Unauthorized changes will lead to removal of privileges and further action if necessary.
                        </li>
                        <li>
                        <h3 className="font-semibold">Accountability</h3>
                        All admins must take responsibility for the content they publish, ensuring it is original, respectful, and appropriate.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-3">Admin Request Requirements</h2>
                    <p className="text-lg mb-4">
                        To become an admin, you must provide the following details:
                    </p>
                    <ul className="list-disc ml-5 space-y-3 text-lg">
                        <li><h3 className="font-semibold">Reason</h3> Why do you want to become an admin?</li>
                        <li><h3 className="font-semibold">Content Goals</h3> What type of posts do you plan to create?</li>
                        <li><h3 className="font-semibold">Impact</h3> How will your content align with our platform's mission and values?</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-3">Consequences of Misuse</h2>
                    <p className="text-lg">
                        Admin access is a privilege, not a right. Any misuse, such as unauthorized deletion or inappropriate updates,
                        will result in:
                    </p>
                    <ul className="list-disc ml-5 space-y-3 text-lg">
                        <li>Immediate revocation of admin privileges</li>
                        <li>Possible account suspension</li>
                        <li>Permanent ban from the platform for repeated violations</li>
                    </ul>

                    <div className="mt-6 text-center">
                        <Button
                        type='button'
                        gradientDuoTone="purpleToBlue"
                        className="font-semibold rounded-full transition"
                        onClick={handleNavigateAndScroll}
                        >
                        Request Admin Access
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
