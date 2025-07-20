import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Calendar, MapPin, Users, Music, Clock, Star, Download } from 'lucide-react';
import ProfessionalLayout, { ProfessionalSection, ProfessionalCard, ProfessionalButton } from '../components/design-system/ProfessionalLayout';

const Booking = () => {
  const bookingPackages = [
    {
      title: 'Club Sets',
      duration: '2-4 hours',
      description: 'High-energy sets perfect for nightclubs and late-night venues',
      features: [
        'Custom mix preparation',
        'Professional DJ equipment',
        'Crowd interaction and MC services',
        'Social media promotion'
      ],
      icon: Music
    },
    {
      title: 'Festival Performances',
      duration: '1-2 hours',
      description: 'Stadium-ready performances with immersive storytelling',
      features: [
        'Large-scale audio/visual coordination',
        'Custom stage plot requirements',
        'Professional sound engineering',
        'Merchandise coordination'
      ],
      icon: Star
    },
    {
      title: 'Private Events',
      duration: '3-6 hours',
      description: 'Curated experiences for weddings, corporate events, and celebrations',
      features: [
        'Personalized playlist consultation',
        'Equipment and setup included',
        'Professional event coordination',
        'Flexible timing and duration'
      ],
      icon: Users
    }
  ];

  const technicalRequirements = [
    {
      category: 'Audio Equipment',
      items: [
        'Pioneer CDJ-3000 or equivalent',
        'DJM-900NXS2 or higher mixer',
        'High-quality monitor speakers',
        'Professional microphone system'
      ]
    },
    {
      category: 'Technical Support',
      items: [
        'Dedicated sound engineer',
        'Backup equipment available',
        'Professional cable management',
        'Load-in coordination'
      ]
    },
    {
      category: 'Venue Requirements',
      items: [
        'Adequate power supply (20A minimum)',
        'Secure DJ booth area',
        'Green room with refreshments',
        'Professional lighting coordination'
      ]
    }
  ];

  return (
    <ProfessionalLayout
      title="Professional Booking"
      description="Book Zack Bissell for your next event. World-class DJ services with immersive storytelling experiences."
      maxWidth="wide"
    >
      {/* Hero Section */}
      <ProfessionalSection spacing="large">
        <div className="text-center">
          <h1
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-large-title)',
              fontWeight: 'var(--font-weight-black)',
              lineHeight: 'var(--line-height-tight)',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-6)',
              textAlign: 'left'
            }}
          >
            Professional{' '}
            <span style={{ color: 'var(--brand-orange)' }}>Booking</span>
          </h1>
          
          <p
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-body-large)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--line-height-relaxed)',
              color: 'var(--color-text-secondary)',
              maxWidth: '800px',
              margin: '0 auto var(--space-8) auto',
              textAlign: 'left'
            }}
          >
            From intimate venues to festival main stages, Zack Bissell delivers world-class performances 
            that transform music into immersive storytelling experiences. Book a true sonic architect 
            for your next event.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ProfessionalButton
              variant="primary"
              size="large"
              onClick={() => {
                const element = document.getElementById('contact-form');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </ProfessionalButton>
            
            <ProfessionalButton
              variant="secondary"
              size="large"
              onClick={() => {
                const element = document.getElementById('tech-rider');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Download className="w-5 h-5" />
              Technical Rider
            </ProfessionalButton>
          </div>
        </div>
      </ProfessionalSection>

      {/* Booking Packages */}
      <ProfessionalSection 
        title="Performance Packages"
        subtitle="Tailored experiences for every venue and audience"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookingPackages.map((pkg) => (
            <ProfessionalCard key={pkg.title} className="text-center">
              <div className="mb-4">
                <pkg.icon 
                  className="w-12 h-12 mx-auto mb-3"
                  style={{ color: 'var(--brand-orange)' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-title3)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  {pkg.title}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-4 h-4" style={{ color: 'var(--color-text-secondary)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {pkg.duration}
                  </span>
                </div>
              </div>
              
              <p
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-4)',
                  textAlign: 'left'
                }}
              >
                {pkg.description}
              </p>
              
              <ul className="space-y-2 text-left">
                {pkg.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--brand-orange)' }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </ProfessionalCard>
          ))}
        </div>
      </ProfessionalSection>

      {/* Technical Requirements */}
      <ProfessionalSection 
        id="tech-rider"
        title="Technical Requirements"
        subtitle="Professional specifications for optimal performance"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicalRequirements.map((section) => (
            <ProfessionalCard key={section.category}>
              <h3
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-headline)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                {section.category}
              </h3>
              
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div 
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--brand-orange)' }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-family-base)',
                        fontSize: 'var(--font-size-body)',
                        color: 'var(--color-text-primary)',
                        lineHeight: 'var(--line-height-relaxed)'
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </ProfessionalCard>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <ProfessionalButton variant="secondary">
            <Download className="w-4 h-4" />
            Download Complete Technical Rider
          </ProfessionalButton>
        </div>
      </ProfessionalSection>

      {/* Contact Form */}
      <ProfessionalSection 
        id="contact-form"
        title="Get In Touch"
        subtitle="Ready to bring immersive storytelling to your event?"
      >
        <div className="max-w-2xl mx-auto">
          <ProfessionalCard>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--border-radius-medium)',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--glass-background)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-body)',
                      minHeight: 'var(--touch-target-min)'
                    }}
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--border-radius-medium)',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--glass-background)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-body)',
                      minHeight: 'var(--touch-target-min)'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="event-type"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    Event Type
                  </label>
                  <select
                    id="event-type"
                    name="eventType"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--border-radius-medium)',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--glass-background)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-body)',
                      minHeight: 'var(--touch-target-min)'
                    }}
                  >
                    <option value="">Select event type</option>
                    <option value="club">Club/Nightclub</option>
                    <option value="festival">Festival</option>
                    <option value="private">Private Event</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label
                    htmlFor="event-date"
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="event-date"
                    name="eventDate"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--border-radius-medium)',
                      border: '1px solid var(--glass-border)',
                      background: 'var(--glass-background)',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-body)',
                      minHeight: 'var(--touch-target-min)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="venue"
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-callout)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-text-primary)',
                    display: 'block',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  Venue & Location
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  placeholder="Venue name and city"
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--border-radius-medium)',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-background)',
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-body)',
                    minHeight: 'var(--touch-target-min)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-callout)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-text-primary)',
                    display: 'block',
                    marginBottom: 'var(--space-1)'
                  }}
                >
                  Event Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your event, expected attendance, duration, and any special requirements..."
                  required
                  style={{
                    width: '100%',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--border-radius-medium)',
                    border: '1px solid var(--glass-border)',
                    background: 'var(--glass-background)',
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-body)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div className="text-center">
                <ProfessionalButton 
                  type="submit" 
                  variant="primary" 
                  size="large"
                >
                  <Mail className="w-5 h-5" />
                  Send Booking Inquiry
                </ProfessionalButton>
              </div>
            </form>
          </ProfessionalCard>

          <div className="text-center mt-6">
            <p
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-callout)',
                color: 'var(--color-text-secondary)'
              }}
            >
              Typical response time: 24-48 hours
            </p>
          </div>
        </div>
      </ProfessionalSection>
    </ProfessionalLayout>
  );
};

export default Booking;