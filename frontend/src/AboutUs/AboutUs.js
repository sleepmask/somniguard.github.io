import React, { useEffect } from 'react';
import './AboutUs.css'; // Add custom styles for the About Us page

function AboutUs() {
    useEffect(() => {
        // Add a class to the body when this page is loaded
        document.body.classList.add('about-us-page');

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('about-us-page');
        };
    }, []);

    return (
        <div className="about-us-page">
            <h1>About Us</h1>
            <p>
                SomniGuard is dedicated to helping you improve your sleep quality through innovative technology.
                Our mission is to make sure you sleep smarter and wake happier.
            </p>
            <p>
                Whether you suffer from sleep disorders or just want to improve your daily routine, our app is here to help!
            </p>
        </div>
    );
}

export default AboutUs;
