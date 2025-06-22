import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './Header.css';
import "../../src/assets/me.jpg";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const imagePreviewRef = useRef(null);

    const menuItemsRef = useRef([]);
    const socialLinksRef = useRef([]);
    const contactInfoRef = useRef([]);

    const menuItems = [
        {
            text: "IDENTITY",
            number: "22",
            href: "#identity",
            image: "https://images.pexels.com/photos/1162643/pexels-photo-1162643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with your image paths
        },
        {
            text: "EXPERIENCE",
            number: "3",
            href: "#experience",
            image: "https://images.pexels.com/photos/2832379/pexels-photo-2832379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            text: "PROJECTS",
            href: "#about",
            image: "https://images.pexels.com/photos/2248589/pexels-photo-2248589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
            text: "LET'S TALK",
            href: "#talk",
            image: "https://images.pexels.com/photos/3310691/pexels-photo-3310691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
    ];

    useEffect(() => {
        // Menu Animation
        const menu = document.querySelector('.menu');
        const menuItems = document.querySelectorAll('.menu-item');
        const menuBg = document.querySelector('.menu-bg');
        const menuLines = document.querySelectorAll('.menu-line');

        if (menu && menuItems.length) {
            if (isMenuOpen) {
                // Opening animation sequence
                gsap.to(menuBg, {
                    clipPath: 'circle(150% at 100% 0)',
                    duration: 1,
                    ease: 'power4.inOut'
                });

                gsap.to(menuLines, {
                    width: '100%',
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power4.out',
                    delay: 0.3
                });

                gsap.to(menuItems, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.4
                });

                // Glow effect animation
                gsap.to('.menu-glow', {
                    opacity: 1,
                    duration: 1,
                    delay: 0.5
                });
            } else {
                // Closing animation sequence
                gsap.to(menuItems, {
                    y: 50,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.05,
                    ease: 'power3.in'
                });

                gsap.to(menuLines, {
                    width: '0%',
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power4.in',
                    delay: 0.2
                });

                gsap.to('.menu-glow', {
                    opacity: 0,
                    duration: 0.3
                });

                gsap.to(menuBg, {
                    clipPath: 'circle(0% at 100% 0)',
                    duration: 0.8,
                    ease: 'power4.inOut',
                    delay: 0.3
                });
            }
        }
    }, [isMenuOpen]);

    useEffect(() => {
        // Buffer Animation
        const loaderBars = document.querySelectorAll('.loader-bar');
        const buffer = document.querySelector('.buffer-animation');
        
        // Create GSAP timeline for loader
        const loaderTl = gsap.timeline({
            repeat: -1,
            defaults: {
                ease: "power2.inOut"
            }
        });

        // Initial setup
        gsap.set(loaderBars, {
            scaleY: 0,
            opacity: 0
        });

        // Add animations to timeline
        loaderTl.to(loaderBars, {
            scaleY: 1,
            opacity: 1,
            duration: 0.5,
            stagger: {
                each: 0.1,
                repeat: 1,
                yoyo: true
            }
        });

        // Hide loader after delay
        setTimeout(() => {
            gsap.to(buffer, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    if (buffer) {
                        buffer.classList.add('buffer-hide');
                    }
                }
            });
        }, 1500);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Create a timeline for smooth animation
        const tl = gsap.timeline();
        
        // Scale down and blur background
        tl.to('.theme-toggle', {
            scale: 0.8,
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .add(() => {
            setTheme(newTheme);
        })
        .to('.theme-toggle', {
            scale: 1,
            duration: 0.2,
            ease: 'power2.inOut'
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (isMenuOpen) {
            // Reset refs for animation
            menuItemsRef.current = document.querySelectorAll('.menu-item');
            socialLinksRef.current = document.querySelectorAll('.social-links a');
            contactInfoRef.current = document.querySelectorAll('.contact-info div');

            // Create timeline for smooth sequence
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });

            // Menu background animation
            tl.fromTo('.menu', 
                {
                    clipPath: 'circle(0% at 100% 0)',
                    opacity: 1
                },
                {
                    clipPath: 'circle(150% at 100% 0)',
                    opacity: 1,
                    duration: 1,
                    ease: "power4.inOut"
                }
            )

            .fromTo(menuItemsRef.current,
                {
                    y: 100,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1
                },
                "-=0.5"
            )

            .fromTo(socialLinksRef.current,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05
                },
                "-=0.4"
            )

            .fromTo(contactInfoRef.current,
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05
                },
                "-=0.4"
            );
        } else {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.inOut"
                }
            });

            tl.to([menuItemsRef.current, socialLinksRef.current, contactInfoRef.current], {
                y: 50,
                opacity: 0,
                duration: 0.4,
                stagger: 0.05
            })
            .to('.menu', {
                clipPath: 'circle(0% at 100% 0)',
                duration: 0.8,
                ease: "power4.inOut"
            });
        }
    }, [isMenuOpen]);

    const handleMouseMove = (e) => {
        if (imagePreviewRef.current) {
            setCursorPosition({ x: e.clientX, y: e.clientY });
            gsap.to(imagePreviewRef.current, {
                x: e.clientX - 100,
                y: e.clientY - 160,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleItemHover = (image, isSocialLink = false) => {
        if (imagePreviewRef.current) {
            imagePreviewRef.current.style.backgroundImage = `url(${image})`;
            gsap.to(imagePreviewRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
                width: isSocialLink ? '80px' : '200px',
                height: isSocialLink ? '80px' : '150px'
            });
        }
    };

    const handleItemLeave = () => {
        if (imagePreviewRef.current) {
            gsap.to(imagePreviewRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    };

    return (
        <>
            <div className="buffer-animation">
                <div className="loader">
                    <div className="loader-bar"></div>
                    <div className="loader-bar"></div>
                    <div className="loader-bar"></div>
                    <div className="loader-bar"></div>
                    <div className="loader-bar"></div>
                </div>
            </div>

            <main className="main-container">
                <header className="header">
                    <div className="header-container">
                        <div className="logo">
                            <a href="/">
                                <img src="https://drive.google.com/file/d/1A6LT0RaVK7PNWl6mdXBnKN2qXZ5j5qoK/preview" alt="" />
                            </a>
                        </div>
                        
                        <div className="header-controls">
                            <button 
                                className={`theme-toggle ${theme === 'light' ? 'light-mode' : ''}`} 
                                aria-label="Toggle Theme"
                                onClick={toggleTheme}
                            >
                                <i className="fa-solid fa-sun"></i>
                                <i className="fa-solid fa-moon"></i>
                            </button>
                            <button 
                                className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
                                aria-label="Toggle Menu"
                                onClick={toggleMenu}
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>

                        <nav 
                            className={`menu ${isMenuOpen ? 'open' : ''}`}
                            onMouseMove={handleMouseMove}
                        >
                            <div className="menu-items">
                                {menuItems.map((item, index) => (
                                    <a 
                                        key={index}
                                        href={item.href} 
                                        className="menu-item"
                                        onMouseEnter={() => handleItemHover(item.image)}
                                        onMouseLeave={handleItemLeave}
                                    >
                                        {item.text}
                                        {item.number && <span className="menu-number">{item.number}</span>}
                                    </a>
                                ))}
                            </div>

                            <div 
                                ref={imagePreviewRef}
                                className="image-preview"
                            ></div>

                            <div className="menu-footer">
                                <div className="social-links">
                                    <a href="#" target='_blank'>Instagram</a>
                                    <a href="#" target='_blank'>LinkedIn</a>
                                    <a href="#" target='_blank'>Github</a>
                                </div>
                                <div className="contact-info">
                                    <div>Clement Town</div>
                                    <div>Near Graphic Era</div>
                                    <div>University, Dehradun 248001</div>
                                    <div>Uttrakhand, India</div>
                                    <div>+91 739 391 6131</div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>
            </main>
        </>
    );
};

export default Header;