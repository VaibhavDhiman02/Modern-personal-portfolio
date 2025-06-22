import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from '../header/Header';
import Hero from '../hero/Hero';
import './MainContainer.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const MainContainer = () => {
    const blobRef = useRef(null);

    useEffect(() => {
        // Create cursor-following blob effect
        const blob = blobRef.current;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let blobX = mouseX;
        let blobY = mouseY;
        let scrollY = 0;

        // Update mouse position on mouse move
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        // Track scroll position
        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);

        // Animation for the blob to follow cursor with smooth delay
        const animateBlob = () => {
            // Smooth follow with easing
            blobX += (mouseX - blobX) * 0.05;
            blobY += (mouseY - blobY) * 0.05;

            // Apply the position to the blob (adjusted for scroll)
            const blobWidth = blob.offsetWidth;
            const blobHeight = blob.offsetHeight;
            
            gsap.set(blob, {
                x: blobX - (blobWidth / 2),
                y: blobY + scrollY - (blobHeight / 2),
            });

            // Add subtle pulsing and shape morphing
            gsap.to(blob, {
                borderRadius: `${40 + Math.sin(Date.now() * 0.001) * 20}% ${
                    60 + Math.sin(Date.now() * 0.0012) * 20
                }% ${50 + Math.cos(Date.now() * 0.001) * 20}% ${
                    70 + Math.cos(Date.now() * 0.0012) * 20
                }%`,
                duration: 0.2,
                ease: "none",
            });

            requestAnimationFrame(animateBlob);
        };

        animateBlob();

        // Cleanup function
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Handle theme changes
    useEffect(() => {
        const themeObserver = new MutationObserver(() => {
            const isDarkMode =
                document.documentElement.classList.contains("dark") ||
                document.body.classList.contains("dark");

            if (blobRef.current) {
                if (isDarkMode) {
                    blobRef.current.style.background =
                        "radial-gradient(circle at center, rgba(88, 130, 193, 0.35), rgba(134, 67, 208, 0.15))";
                } else {
                    blobRef.current.style.background =
                        "radial-gradient(circle at center, rgba(254, 209, 228, 0.45), rgba(202, 227, 255, 0.25))";
                }
            }
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => themeObserver.disconnect();
    }, []);

    return (
        <div className="main-container">
            {/* Cursor following blob */}
            <div className="cursor-blob" ref={blobRef}></div>
            <Header />
            <Hero />
            
        </div>
    );
};

export default MainContainer;