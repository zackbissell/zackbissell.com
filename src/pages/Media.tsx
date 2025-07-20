import React from 'react';
import { Helmet } from 'react-helmet';
import { 
  Download, 
  ExternalLink, 
  Award, 
  TrendingUp, 
  Music2, 
  Camera, 
  FileText,
  Globe,
  Instagram,
  Twitter,
  Youtube,
  Play
} from 'lucide-react';
import ProfessionalLayout, { ProfessionalSection, ProfessionalCard, ProfessionalButton } from '../components/design-system/ProfessionalLayout';

const Media = () => {
  const achievements = [
    {
      title: '#1 Global Dance Punk',
      description: '"nostalgia trap, reality slap" topped Mixcloud charts',
      icon: Award,
      color: 'var(--brand-orange)'
    },
    {
      title: '#43 Global Indie Dance',
      description: 'Consistent top 100 charting across multiple mixes',
      icon: TrendingUp,
      color: 'var(--brand-orange)'
    },
    {
      title: 'Brooklyn Resident',
      description: 'Weekly events at Broken Land, Talon, and premium venues',
      icon: Music2,
      color: 'var(--brand-orange)'
    },
    {
      title: 'Multi-Genre Innovation',
      description: 'Pioneering immersive storytelling through DJ sets',
      icon: Globe,
      color: 'var(--brand-orange)'
    }
  ];

  const pressKit = [
    {
      title: 'High-Resolution Photos',
      description: 'Professional performance and portrait photography',
      icon: Camera,
      downloadUrl: '#',
      size: '25MB ZIP'
    },
    {
      title: 'Artist Biography',
      description: 'Complete bio, achievements, and technical information',
      icon: FileText,
      downloadUrl: '#',
      size: '2MB PDF'
    },
    {
      title: 'Technical Rider',
      description: 'Complete technical requirements and stage plot',
      icon: Music2,
      downloadUrl: '#',
      size: '1.5MB PDF'
    },
    {
      title: 'Press Release',
      description: 'Latest news, tour dates, and promotional materials',
      icon: ExternalLink,
      downloadUrl: '#',
      size: '1MB PDF'
    }
  ];

  const streamingPlatforms = [
    { name: 'Mixcloud', url: '#', plays: '500K+' },
    { name: 'SoundCloud', url: '#', plays: '250K+' },
    { name: 'Spotify', url: '#', plays: '100K+' },
    { name: 'Apple Music', url: '#', plays: '75K+' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: '#', followers: '15K' },
    { name: 'Twitter', icon: Twitter, url: '#', followers: '8K' },
    { name: 'YouTube', icon: Youtube, url: '#', subscribers: '12K' }
  ];

  return (
    <ProfessionalLayout
      title="Media & Press Kit"
      description="Download high-resolution photos, bio, and press materials for Zack Bissell - Brooklyn-based DJ and sonic architect."
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
            Media &{' '}
            <span style={{ color: 'var(--brand-orange)' }}>Press Kit</span>
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
            Download high-resolution assets, press materials, and comprehensive information 
            about Zack Bissell - the Brooklyn-based DJ revolutionizing electronic music through 
            immersive storytelling experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ProfessionalButton
              variant="primary"
              size="large"
              onClick={() => {
                const element = document.getElementById('press-kit');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Download className="w-5 h-5" />
              Download Full EPK
            </ProfessionalButton>
            
            <ProfessionalButton
              variant="secondary"
              size="large"
              onClick={() => {
                const element = document.getElementById('bio-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <FileText className="w-5 h-5" />
              Read Bio
            </ProfessionalButton>
          </div>
        </div>
      </ProfessionalSection>

      {/* Key Achievements */}
      <ProfessionalSection 
        title="Key Achievements"
        subtitle="Chart-topping performances and industry recognition"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <ProfessionalCard key={achievement.title} className="text-center">
              <achievement.icon 
                className="w-12 h-12 mx-auto mb-4"
                style={{ color: achievement.color }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-headline)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                {achievement.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-secondary)',
                  textAlign: 'left'
                }}
              >
                {achievement.description}
              </p>
            </ProfessionalCard>
          ))}
        </div>
      </ProfessionalSection>

      {/* Artist Biography */}
      <ProfessionalSection 
        id="bio-section"
        title="Artist Biography"
        subtitle="The story behind the music"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfessionalCard>
              <div
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-body)',
                  lineHeight: 'var(--line-height-relaxed)',
                  color: 'var(--color-text-primary)'
                }}
              >
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  <strong>Zack Bissell</strong> is an innovative multi-genre DJ, producer, and singer based in Brooklyn, 
                  holding residencies and weekly events at premier establishments including Broken Land and Talon. 
                  Known for his dynamic storytelling through music, Zack crafts immersive sets that blend indie dance, 
                  house, and other genres, taking listeners on thematic journeys that transcend traditional DJ performances.
                </p>
                
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  His meticulous approach to recording and high-quality audio production has consistently earned recognition 
                  on global charts. Notably, his mix <em>"nostalgia trap, reality slap"</em> reached <strong>#1 on the Global Dance Punk</strong> charts 
                  and <strong>#43 on the Global Indie Dance/Alternative Dance</strong> charts on Mixcloud, establishing him as a 
                  force in the electronic music landscape.
                </p>
                
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  Whether commanding the main stage at packed festivals or creating intimate experiences for discerning 
                  audiences, Zack Bissell's passion for music and revolutionary approach to storytelling makes him a 
                  standout figure in the contemporary dance music community.
                </p>
              </div>
            </ProfessionalCard>
          </div>
          
          <div className="space-y-6">
            {/* Quick Facts */}
            <ProfessionalCard>
              <h3
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-headline)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Based:</span>{' '}
                  Brooklyn, New York
                </div>
                <div>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Genres:</span>{' '}
                  Indie Dance, House, Electronic
                </div>
                <div>
                  <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Residencies:</span>{' '}
                  Broken Land, Talon
                </div>
              </div>
            </ProfessionalCard>

            {/* Streaming Stats */}
            <ProfessionalCard>
              <h3
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-headline)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-4)'
                }}
              >
                Streaming Platforms
              </h3>
              <div className="space-y-3">
                {streamingPlatforms.map((platform) => (
                  <div key={platform.name} className="flex justify-between items-center">
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {platform.name}
                    </span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      {platform.plays}
                    </span>
                  </div>
                ))}
              </div>
            </ProfessionalCard>
          </div>
        </div>
      </ProfessionalSection>

      {/* Press Kit Downloads */}
      <ProfessionalSection 
        id="press-kit"
        title="Press Kit Downloads"
        subtitle="High-quality assets for media and promotional use"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pressKit.map((item) => (
            <ProfessionalCard key={item.title} interactive>
              <div className="text-center">
                <item.icon 
                  className="w-12 h-12 mx-auto mb-4"
                  style={{ color: 'var(--brand-orange)' }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-headline)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-body)',
                    color: 'var(--color-text-secondary)',
                    marginBottom: 'var(--space-4)',
                    textAlign: 'left'
                  }}
                >
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-callout)',
                      color: 'var(--color-text-tertiary)'
                    }}
                  >
                    {item.size}
                  </span>
                  <ProfessionalButton variant="secondary" size="small">
                    <Download className="w-4 h-4" />
                  </ProfessionalButton>
                </div>
              </div>
            </ProfessionalCard>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <ProfessionalButton variant="primary" size="large">
            <Download className="w-5 h-5" />
            Download Complete EPK Package
          </ProfessionalButton>
        </div>
      </ProfessionalSection>

      {/* Social Media & Links */}
      <ProfessionalSection 
        title="Connect & Follow"
        subtitle="Stay updated with latest releases and performances"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Media */}
          <ProfessionalCard>
            <h3
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-headline)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)'
              }}
            >
              Social Media
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social) => (
                <div key={social.name} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: 'var(--glass-border)' }}>
                  <div className="flex items-center gap-3">
                    <social.icon className="w-5 h-5" style={{ color: 'var(--brand-orange)' }} />
                    <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                      {social.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-callout)' }}>
                      {social.followers}
                    </span>
                    <ExternalLink className="w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </ProfessionalCard>

          {/* Featured Mix */}
          <ProfessionalCard>
            <h3
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-headline)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-4)'
              }}
            >
              Featured Mix
            </h3>
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Play className="w-16 h-16 text-white" />
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body-large)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-2)'
              }}
            >
              Nostalgia Trap: Reality Slap
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-4)'
              }}
            >
              #1 Global Dance Punk | 250K+ plays
            </p>
            <ProfessionalButton variant="secondary">
              <ExternalLink className="w-4 h-4" />
              Listen on Mixcloud
            </ProfessionalButton>
          </ProfessionalCard>
        </div>
      </ProfessionalSection>

      {/* Contact for Press */}
      <ProfessionalSection 
        title="Press Inquiries"
        subtitle="For interviews, features, and media requests"
      >
        <div className="max-w-2xl mx-auto text-center">
          <ProfessionalCard>
            <div className="mb-6">
              <h3
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-headline)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)'
                }}
              >
                Media Contact
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                For press inquiries, interview requests, and media collaborations
              </p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Email:</span>{' '}
                press@zackbissell.com
              </div>
              <div>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Response Time:</span>{' '}
                24-48 hours
              </div>
            </div>

            <ProfessionalButton variant="primary" size="large">
              Send Press Inquiry
            </ProfessionalButton>
          </ProfessionalCard>
        </div>
      </ProfessionalSection>
    </ProfessionalLayout>
  );
};

export default Media;