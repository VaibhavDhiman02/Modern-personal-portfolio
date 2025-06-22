import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import "./Skills.css";
import "./Experience.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";
import "./Letsconnect.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // References for the list items
  const codingRef = useRef(null);
  const designRef = useRef(null);

  // State to keep track of mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Arrays of image URLs for each category
  const codingImages = [
    "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const designImages = [
    "https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const projectsData = [
    {
      id: 1,
      title: "Project Name",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente pariatur iste tempore quisquam doloribus ad eos a necessitatibus sequi ullam.",
      image: "https://images.pexels.com/photos/4888895/pexels-photo-4888895.jpeg", // Update with your actual image path
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://project-link.com",
      github: "https://github.com/yourusername/project-repo"
    },
    {
      id: 2,
      title: "Another Project",
      description: "A sleek, modern application with intuitive user experience and powerful backend functionality.",
      image: "/src/assets/project2.jpg", // Update with your actual image path
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "https://another-project.com",
      github: "https://github.com/yourusername/another-repo"
    },
    {
      id: 3,
      title: "Creative Design",
      description: "An innovative design project showcasing modern UI/UX principles and interactive elements.",
      image: "/src/assets/project3.jpg", // Update with your actual image path
      technologies: ["Figma", "Adobe XD", "CSS"],
      link: "https://design-project.com",
      github: "https://github.com/yourusername/design-repo"
    },
    {
      id: 4,
      title: "Creative Design",
      description: "An innovative design project showcasing modern UI/UX principles and interactive elements.",
      image: "/src/assets/project3.jpg", // Update with your actual image path
      technologies: ["Figma", "Adobe XD", "CSS"],
      link: "https://design-project.com",
      github: "https://github.com/yourusername/design-repo"
    },
    {
      id: 5,
      title: "Creative Design",
      description: "An innovative design project showcasing modern UI/UX principles and interactive elements.",
      image: "/src/assets/project3.jpg", // Update with your actual image path
      technologies: ["Figma", "Adobe XD", "CSS"],
      link: "https://design-project.com",
      github: "https://github.com/yourusername/design-repo"
    },
    {
      id: 6,
      title: "Creative Design",
      description: "An innovative design project showcasing modern UI/UX principles and interactive elements.",
      image: "/src/assets/project3.jpg", // Update with your actual image path
      technologies: ["Figma", "Adobe XD", "CSS"],
      link: "https://design-project.com",
      github: "https://github.com/yourusername/design-repo"
    },
  ];

  // Image follower elements
  const imageFollowerRef = useRef(null);

  useEffect(() => {
    // Create the image follower element
    const imageFollower = document.createElement("div");
    imageFollower.className = "image-follower";
    document.body.appendChild(imageFollower);
    imageFollowerRef.current = imageFollower;

    // Set up the initial style for the follower
    gsap.set(imageFollower, {
      width: "250px",
      height: "250px",
      borderRadius: "12px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "fixed",
      pointerEvents: "none",
      opacity: 0,
      zIndex: 9999,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
      border: "2px solid rgba(255, 255, 255, 0.2)",
    });

    // Set up event listeners for both list items
    setupHoverEffect(codingRef.current, codingImages);
    setupHoverEffect(designRef.current, designImages);

    // Cleanup function
    return () => {
      if (imageFollower && imageFollower.parentNode) {
        imageFollower.parentNode.removeChild(imageFollower);
      }
    };
  }, []);

  // Function to set up hover effect for a specific element
  const setupHoverEffect = (element, images) => {
    if (!element) return;

    let lastMoveX = 0;
    let lastMoveY = 0;
    let moveThreshold = 30; // Distance to move before changing image
    let accumulatedDistance = 0;
    let currentImageIndex = 0;

    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Event listener for mouse enter
    element.addEventListener("mouseenter", () => {
      // Reset values
      currentImageIndex = 0;
      accumulatedDistance = 0;

      // Set initial image with smooth appearance
      gsap.to(imageFollowerRef.current, {
        backgroundImage: `url(${images[currentImageIndex]})`,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Track mouse movement
      element.addEventListener("mousemove", handleMouseMove);
    });

    // Handle mouse movement and image transitions
    const handleMouseMove = (e) => {
      updateFollowerPosition(e);

      // Calculate movement distance
      const moveX = e.clientX - lastMoveX;
      const moveY = e.clientY - lastMoveY;
      const distance = Math.sqrt(moveX * moveX + moveY * moveY);

      // Update last position
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;

      // Accumulate distance
      accumulatedDistance += distance;

      // Change image when accumulated distance exceeds threshold
      if (accumulatedDistance > moveThreshold) {
        accumulatedDistance = 0;
        const nextImageIndex = (currentImageIndex + 1) % images.length;

        // Create crossfade effect between images
        const tempElement = document.createElement("div");
        tempElement.style.position = "absolute";
        tempElement.style.top = "0";
        tempElement.style.left = "0";
        tempElement.style.width = "100%";
        tempElement.style.height = "100%";
        tempElement.style.backgroundImage = `url(${images[currentImageIndex]})`;
        tempElement.style.backgroundSize = "cover";
        tempElement.style.backgroundPosition = "center";
        tempElement.style.zIndex = "1";

        imageFollowerRef.current.style.backgroundImage = `url(${images[nextImageIndex]})`;
        imageFollowerRef.current.appendChild(tempElement);

        // Animate out the old image
        gsap.to(tempElement, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            if (tempElement.parentNode === imageFollowerRef.current) {
              imageFollowerRef.current.removeChild(tempElement);
            }
          },
        });

        currentImageIndex = nextImageIndex;
      }
    };

    // Event listener for mouse leave
    element.addEventListener("mouseleave", () => {
      gsap.to(imageFollowerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Clear any leftover elements
          while (imageFollowerRef.current.firstChild) {
            imageFollowerRef.current.removeChild(
              imageFollowerRef.current.firstChild
            );
          }
        },
      });
      element.removeEventListener("mousemove", handleMouseMove);
    });
  };

  // Function to update the follower position based on mouse movement
  const updateFollowerPosition = (e) => {
    // Get mouse coordinates
    const x = e.clientX;
    const y = e.clientY;

    // Animate the follower to the new position with smooth easing
    gsap.to(imageFollowerRef.current, {
      left: x,
      top: y,
      xPercent: -50,
      yPercent: -50,
      duration: 0.2,
      ease: "power2.out",
    });

    // Add subtle transformations based on movement direction
    const moveX = x - mousePosition.x;
    const moveY = y - mousePosition.y;

    if (Math.abs(moveX) > 3 || Math.abs(moveY) > 3) {
      // Calculate tilt based on movement direction and speed
      const tiltX = moveY * 0.03; // Tilt on X-axis based on vertical movement
      const tiltY = -moveX * 0.03; // Tilt on Y-axis based on horizontal movement

      gsap.to(imageFollowerRef.current, {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.4,
        ease: "power1.out",
      });

      // Add subtle scale effect based on movement speed
      const speed = Math.sqrt(moveX * moveX + moveY * moveY);
      const scaleAdjustment = Math.min(0.05, speed * 0.0005);

      gsap.to(imageFollowerRef.current, {
        scale: 1 + scaleAdjustment,
        duration: 0.3,
      });
    }

    // Update mouse position state
    setMousePosition({ x, y });
  };

  return (
    <>
      <div className="hero-section-main-container">
        <div className="hero-section-name-container">
          <h1>Hi, I am Vaibhav Dhiman</h1>
        </div>
        <div className="hero-section-about-me-content-container">
          <p>
            I'm a creative professional who codes, designs user-friendly
            interfaces, and creates graphics to build clean, engaging, and
            effective digital products.
          </p>
        </div>
        <div className="hero-section-move-forward-button-to-click">
          <p>Looks Interesting, Right?</p>
          <a
            href="#portfolio"
            className="hero-section-move-forward-button-to-click-anchor-tag"
          >
            <i className="fa-solid fa-computer-mouse"></i>
          </a>
        </div>
      </div>

      {/* ----------SKILLS------------- */}
      <div className="my-all-skills">
        <div className="all-skills-heading-container">
          <h1>Tech and Design Stack</h1>
        </div>
        <div className="my-skill-container">
          <ul>
            <li ref={codingRef} className="hover-effect-item">
              <h1>Coding Stack</h1>
              <p>
                I specialize in building responsive, high-performance web
                applications that are both functional and user-friendly. My
                approach focuses on writing clean, maintainable code that brings
                ideas to life with precision and efficiency.
              </p>
              <i className="fa-solid fa-arrow-right"></i>
            </li>
            <li ref={designRef} className="hover-effect-item">
              <h1>Design Stack</h1>
              <p>
                With a strong eye for detail and user experience, I design
                intuitive interfaces and compelling visuals. My work bridges the
                gap between aesthetics and usability, ensuring every design
                serves a clear purpose and enhances the overall user journey.
              </p>
              <i className="fa-solid fa-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>

      {/* ----------EXPERIENCE------------- */}

      <div className="my-experience-main-container">
        <div className="exp-inner-container-content">
          <div
            className="all-skills-heading-container"
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <h1>Dev Footprints</h1>
          </div>
          <div className="exp-container-timeline">
            <div className="first-exp">
              <h1>2021</h1>
              <p>
              I started freelancing in 2021 to earn some side income as I began my college journey. I initially stepped into the world of graphic design, which later sparked my interest in UI/UX design using Figma. As time went on, I naturally transitioned into web development since it aligned with my college curriculum and personal interests.
              </p>
            </div>
            <div className="second-exp">
              <h1>2024</h1>
              <p>
              In 2024, during my final year of college, I started looking for meaningful internship opportunities where I could apply my skills and grow professionally. In November, I received my first offer as a Web Developer and UI/UX Designer at Knoqlogico IT Solutions. This role allowed me to work on live projects, collaborate with a professional team, and gain hands-on experience in both design and development.
              </p>
            </div>
            <div className="first-exp">
              <h1>2025</h1>
              <p>
              Now, in 2025, I'm working full-time at Knoqlogico IT Solutions. The journey so far has been full of learning and growth, and I'm continuously exploring new skills and experiences to keep improving both personally and professionally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------PROJECTS------------- */}
      <div className="projects-section" id="projects">
        <div className="projects-heading-container">
        <div className="all-skills-heading-container">
          <h1>My Work</h1>
        </div>
          <div className="projects-title-underline"></div>
        </div>
        
        <div className="projects-grid">
          {projectsData.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
          {/* ----------CONNECT------------- */}

          <div className="lets-connect-main-container">
            <div className="connect-inner-container">
              <a href="mailto:dhimanvaibhav839@gmail.com">
                <p>Let's Talk</p>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          {/* ----------FOOTER------------- */}

          <div className="footer-main-container">
            <div className="footer-inner-container">
              <p>Copyright &copy; 2025 Vaibhav Dhiman</p>
            </div>
          </div>
          


    </>
  );
};

export default Hero;


// Projects data array

