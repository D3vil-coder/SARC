import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo_image from './sarc logo.jpg'; 

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home'); // State to manage current page
  const [isNavOpen, setIsNavOpen] = useState(false); // State for mobile navigation toggle


  // Function to navigate between pages
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsNavOpen(false); // Close mobile nav on navigation
  };

  function Card({ imageSrc, title, description, buttonText}) {
  return (
    // The .card-container wraps the card and applies the glowing border effect.
    // It's also responsible for centering the card horizontally on the page.
    <div className="card-container">
      <div className="card">
        {/* The image for the card. Its source and alt text are dynamic via props. */}
        {/* The image is absolutely positioned at the top of the card. */}
        <img src={imageSrc} alt={title} />

        {/* The main content area of the card, flex-aligned to the bottom. */}
        {/* The padding-top on the .card itself creates space for the image above this content. */}
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="button">
          {buttonText}
        </div>
      </div>
      {/* The .accents div and its children have been removed as requested,
          replaced by the box-shadow glow on .card-container. */}
    </div>
  );
}

  // Image Carousel Component
  const ImageCarousel = () => {
    const images = [
      { src: 'https://placehold.co/1200x500/0A0A0A/B8860B?text=Yearbook', alt: 'Yearbook' },
      { src: 'https://placehold.co/1200x500/0A0A0A/00CED1?text=Donor+Wall', alt: 'Donor Wall' },
      { src: 'https://placehold.co/1200x500/0A0A0A/B8860B?text=Campus+Reunions', alt: 'Campus Reunions' },
      { src: 'https://placehold.co/1200x500/0A0A0A/00CED1?text=ASMP', alt: 'ASMP' },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    // Auto-play functionality
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval); // Cleanup interval
    }, [images.length]);

    // Navigate to previous image
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Navigate to next image
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
      <div className="carousel-container">
        <div
          ref={carouselRef}
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="carousel-image"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/1200x500/cccccc/333333?text=${encodeURIComponent(image.alt)}`; }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="carousel-button prev"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="carousel-button next"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots for direct navigation */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to image ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    );
  };

  // Render the current page based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="page-content home-page">
            <h1 className="main-heading animated-heading">
              Welcome to <span className="highlight-text">SARC IITB</span>
            </h1>
            <p className="sub-heading">
              Connecting Students with Alumni, Building a Stronger Community.
            </p>
            <div className="carousel-wrapper">
              <ImageCarousel />
            </div>
            <section className="initiatives-section">
              <h2 className="section-title">Our Initiatives</h2>
              <div className="card-grid">
                <Card
                  title="Mentorship Programs"
                  description="Connecting students with experienced alumni for guidance and career development."
                  imageSrc='https://placehold.co/400x200/1C1C1C/00CED1?text=Mentorship'
                  buttonText="Learn More"
                />
                <Card
                  title="Alumni Networking"
                  description="Organizing events and platforms for students to network with successful alumni."
                  imageSrc="https://placehold.co/400x200/1C1C1C/B8860B?text=Networking"
                  buttonText="Learn More"
                />
                <Card
                  title="Guest Lectures"
                  description="Inviting alumni to share their insights and experiences with the student body."
                  imageSrc="https://placehold.co/400x200/1C1C1C/00CED1?text=Lectures"
                  buttonText="Learn More"
                />
              </div>
            </section>
          </div>
        );
      case 'about':
        return (
          <div className="page-content about-page">
            <h1 className="main-heading">About SARC IITB</h1>
            <div className="about-content-box">
              <p className="paragraph-text">
                The Student Alumni Relations Cell (SARC) at IIT Bombay is dedicated to fostering a strong and enduring relationship between the students and the esteemed alumni of the institute. We believe that the alumni network is a valuable asset that can significantly contribute to the growth and development of current students.
              </p>
              <p className="paragraph-text">
                Our mission is to create a vibrant platform for interaction, knowledge sharing, and mutual growth. We organize a variety of events and initiatives throughout the year, including mentorship programs, guest lectures, alumni meets, and networking sessions, all designed to bridge the gap between the past and present generations of IIT Bombay.
              </p>
              <p className="paragraph-text">
                SARC strives to instill a sense of pride and belonging among students, encouraging them to leverage the vast experience and wisdom of our alumni community. We are committed to building a legacy of strong connections that benefit both students in their academic and professional journeys, and alumni in their continued engagement with their alma mater.
              </p>
            </div>
            <div className="card-grid about-cards">
              <Card
                
                description="To build a robust and mutually beneficial relationship between students and alumni, fostering a lifelong connection with IIT Bombay."
                imageSrc="https://placehold.co/400x200/1C1C1C/B8860B?text=Vision"
                buttonText="Learn More"
              />
              <Card
                
                description="Integrity, Collaboration, Excellence, and Community are at the core of everything we do at SARC."
                imageSrc="https://placehold.co/400x200/1C1C1C/00CED1?text=Values"
                buttonText="Learn More"
              />
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="page-content events-page">
            <h1 className="main-heading">Upcoming Events</h1>
            <div className="card-grid">
              <Card
                title="Alumination"
                description="A Flagship Fest of alumni from various batches for networking and insightful discussions."
                imageSrc="https://placehold.co/400x200/1C1C1C/B8860B?text=Alumination"
                buttonText="View Details"
              />
              <Card
                title="Industry Insights Series"
                description="A series of talks by alumni leaders sharing their experiences from different industries."
                imageSrc="https://placehold.co/400x200/1C1C1C/00CED1?text=Industry+Insights"
                buttonText="View Details"
              />
              <Card
                title="Placement Preparation Drive"
                description="Mentors guide students for placements."
                imageSrc="https://placehold.co/400x200/1C1C1C/B8860B?text=Placement+Drive"
                buttonText="View Details"
              />
              <Card
                title="Startup Showcase"
                description="Alumni entrepreneurs present their ventures to students and potential investors."
                imageSrc="https://placehold.co/400x200/1C1C1C/00CED1?text=Startup+Showcase"
                buttonText="View Details"
              />
              <Card
                title="Career Guidance Workshop"
                description="Workshops led by alumni to help students navigate career paths and job applications."
                imageSrc="https://placehold.co/400x200/1C1C1C/B8860B?text=Career+Workshop"
                buttonText="View Details"
              />
              <Card
                title="ASMP"
                description="A grand event bringing together IITB alumni as year long mentors for students."
                imageSrc="https://placehold.co/400x200/1C1C1C/00CED1?text=ASMP"
                buttonText="View Details"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Background elements for visual appeal */}
        <div className="background-overlay"></div>

        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-brand">
              <img
                src={logo_image}
                alt="SARC Logo"
                className="navbar-logo"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/FFFFFF/000000?text=S`; }}
              />
              <span className="navbar-title">SARC IITB</span>
            </div>

            {/* Desktop Navigation */}
            <div className="nav-links">
              <button
                onClick={() => navigateTo('home')}
                className={`nav-link-button ${currentPage === 'home' ? 'active' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`nav-link-button ${currentPage === 'about' ? 'active' : ''}`}
              >
                About Us
              </button>
              <button
                onClick={() => navigateTo('events')}
                className={`nav-link-button ${currentPage === 'events' ? 'active' : ''}`}
              >
                Events
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="mobile-nav-toggle"
              aria-label="Toggle navigation"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isNavOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isNavOpen && (
            <div className="mobile-nav-menu open">
              <button onClick={() => navigateTo('home')}>Home</button>
              <button onClick={() => navigateTo('about')}>About Us</button>
              <button onClick={() => navigateTo('events')}>Events</button>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <main className="main-content">
          {renderPage()}
        </main>

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">© {new Date().getFullYear()} SARC IITB. All rights reserved.</p>
          <p className="footer-text">
            Designed with <span className="heart-icon">❤️</span> for the IITB Community.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/groups/SARC.IITB/" className="social-link-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.815c-3.238 0-5.185 1.237-5.185 5v2.667z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/sarc-iitbombay/?originalSubdomain=in" className="social-link-icon" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.969v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.59-11.018-3.714v-2.155z"/></svg>
            </a>
            <a href="https://www.instagram.com/sarc_iitb/?hl=en" className="social-link-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.85-1.148 3.252-1.691 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.85 1.148-3.252 1.691-4.771 4.919-4.919 1.266-.058 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/></svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;


