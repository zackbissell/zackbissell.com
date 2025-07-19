import React from 'react';
import Layout from '@/components/global/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  ExternalLink, 
  Music, 
  Award, 
  Users, 
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

const EPK = () => {
  const achievements = [
    {
      icon: <Award className="h-5 w-5" />,
      title: "Apple Artist Residencies",
      description: "Producer for Apple NYC DJ residencies (Apple Fifth Avenue & Williamsburg)",
      highlight: true
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Media Features", 
      description: "Featured by Resident Advisor, Mixcloud, and VerseOne",
      highlight: false
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Notable Collaborations",
      description: "Performed and collaborated with DJ CherishTheLuv, Jasmine Solano, and Just Blaze",
      highlight: false
    },
    {
      icon: <Music className="h-5 w-5" />,
      title: "Community & Innovation",
      description: "Events built with a focus on story, community, and innovation",
      highlight: false
    }
  ];

  const flagshipMixes = [
    {
      title: "Disco Ascension",
      subtitle: "When House Music Breaks Reality",
      description: "A flagship mix documenting the hidden temporal effects of house music on the space-time continuum. This interdimensional disco-house saga blurs 2023 with a legendary 1994 NYC rave.",
      badge: "Signature Work",
      stats: "Featured Mix"
    },
    {
      title: "Nostalgia Trap", 
      subtitle: "Reality Slap",
      description: "A chart-topping mix (#1 on Mixcloud House charts; #43 global) that captures the tension between memory and the present.",
      badge: "Chart Topper",
      stats: "#1 Mixcloud House"
    },
    {
      title: "House Work: Elevation",
      subtitle: "The Film", 
      description: "A cinematic house journey exploring the genre's origins and evolution, bridging visual storytelling and musical narrative.",
      badge: "Cinematic",
      stats: "Visual Narrative"
    },
    {
      title: "4:45 Somewhere in Brooklyn",
      subtitle: "Urban Legend",
      description: "A late-night warehouse set turned urban legend. Sparked by a covert 4:45am invite to a Greenpoint warehouse.",
      badge: "Underground",
      stats: "Brooklyn Lore"
    },
    {
      title: "Role Model",
      subtitle: "Pure Spontaneity",
      description: "300 tracks, one take, no prep – this mix is what happens when chaos, caffeine, and instinct collide.",
      badge: "Experimental", 
      stats: "300 Tracks / 1 Take"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-6 text-sm font-medium">
                Electronic Press Kit
              </Badge>
              <h1 className="text-large-title font-bold text-foreground mb-6">
                Zack Bissell
              </h1>
              <p className="text-title2 text-foreground-secondary mb-8 max-w-3xl mx-auto">
                Brooklyn's storytelling DJ & sonic architect, delivering world-class 
                narrative-driven sets and unforgettable musical journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Full EPK
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-6">Biography</h2>
              <div className="prose prose-lg max-w-none text-foreground-secondary">
                <p className="mb-6">
                  Zack Bissell is a Brooklyn-based DJ, producer, and creative powerhouse. Fusing 
                  house, disco, and indie dance with narrative storytelling, he crafts unforgettable 
                  sets that move crowds both emotionally and physically.
                </p>
                <p>
                  A former Broadway actor and the founder of Lab Obsidian, Zack is renowned for 
                  his technical precision, relentless innovation, and storytelling vision that turns 
                  dance floors into cinematic journeys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Achievements & Collaborations
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border bg-card ${
                    achievement.highlight ? 'border-primary/20 bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      achievement.highlight ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Mixes Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Flagship Mixes – Selected Highlights
              </h2>
              <p className="text-body-large text-foreground-secondary max-w-2xl mx-auto">
                Groundbreaking narrative-driven sets that showcase technical precision 
                and storytelling innovation.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {flagshipMixes.map((mix, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="mb-2">
                      {mix.badge}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {mix.stats}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {mix.title}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {mix.subtitle}
                  </p>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {mix.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Obsidian Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-6">
                Lab Obsidian – Ethos & Vision
              </h2>
              <div className="prose prose-lg max-w-none text-foreground-secondary">
                <p className="mb-6">
                  Lab Obsidian – Zack's creative label and collective – draws from streetwear, 
                  subculture, editorial design, and post-industrial music scenes. The brand world is 
                  built on "minimalist chaos, editorial hierarchy, anti-polish energy, and absolute 
                  intentionality".
                </p>
                <p>
                  In a world of noise, Lab Obsidian forges with sharp edges, full 
                  contrast, and no filler – favoring clarity over clutter, emotion over perfection, and 
                  an unapologetically bold style.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Booking CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-title1 font-bold text-foreground mb-6">
              Ready to Book?
            </h2>
            <p className="text-body-large text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Bring world-class narrative-driven sets and unforgettable musical journeys 
              to your next event.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book Now
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                View Stage Plot
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default EPK;