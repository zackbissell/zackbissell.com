import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Play, ArrowRight, Music, Calendar, Zap, Heart, AlertTriangle } from 'lucide-react';
import InterceptedTranscript from '../components/ui/InterceptedTranscript';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    "Every set is a story. Every story is a journey. Every journey is legendary.",
    "From Broadway stages to Brooklyn rooftops—the narrative never stops.",
    "Technical precision meets emotional chaos. That's where the magic lives.",
    "Not just a DJ, but a sonic architect of unforgettable experiences."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredMixes = [
    {
      title: "Disco Ascension",
      subtitle: "A Disco House Paradox",
      description: "A temporal rupture in the space-time continuum. Government classified. Listen with caution.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      link: "/disco-ascension",
      mood: "conspiracy",
      icon: AlertTriangle,
      color: "from-red-500 to-amber-500"
    },
    {
      title: "Nostalgia Trap",
      subtitle: "For the Emotionally Unstable",
      description: "Think of that person who wrecked you. Blocked on all socials. Now listen and let nostalgia trap you.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      link: "/nostalgia-trap",
      mood: "emotional",
      icon: Heart,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Role Model",
      subtitle: "Unhinged Excellence",
      description: "300 barely-heard tracks, no plan, pure instinct. One take, no prep, no regrets. Just caffeine and chaos.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      link: "/role-model",
      mood: "chaotic",
      icon: Zap,
      color: "from-yellow-500 to-red-500"
    },
    {
      title: "House Work: Elevation",
      subtitle: "Rise Above",
      description: "Join me as we elevate the house. Every beat climbs higher. Every drop takes you further.",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop",
      link: "/house-work",
      mood: "elevation",
      icon: Music,
      color: "from-blue-500 to-amber-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Home – Zack Bissell</title>
      </Helmet>
      <div className="min-h-screen bg-white">
      {/* Hero Section - Editorial Style */}
      <section className="pt-24 pb-16">
        <div className="content-container">
          <div className="text-center animate-fade-in">
            <h1 className="text-large-title mb-8">
              It all begins <br />
              with a <span className="accent-underline">story</span>.
            </h1>
          </div>
        </div>
      </section>

      {/* Ethos Section */}
      <section className="section-padding bg-background-secondary">
        <div className="content-container text-center">
          <h2 className="text-title2 mb-8">My Ethos</h2>
          <p className="text-body-large mb-8 max-w-3xl mx-auto">
            Each mix is sparked by a feeling, <span className="accent-underline">an emotion</span>, a story—crafted to transport you.
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-body mb-8">
              From the festival stage to intimate venues, and now through this{' '}
              <span className="accent-underline">immersive</span> experience, every beat is designed to connect.
            </p>
            <p className="text-title3 font-semibold mb-12">
              But that's just the beginning.
            </p>
            <p className="text-body mb-12">
              Explore below and let the music take you on a journey uniquely yours.
            </p>
            <p className="text-title3">
              This story is <span className="accent-underline">yours</span> to experience.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="content-container text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Media Page
            </Link>
            <Link to="/disco-ascension" className="btn-secondary inline-flex items-center gap-2">
              EPK Download
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content Grid */}
      <section className="section-padding bg-background-secondary">
        <div className="content-container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* House Work Feature */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <div className="p-8 h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <h3 className="text-title1 font-bold mb-4">HOUSE WORK: ELEVATION</h3>
                    <p className="text-subheadline">ZACK BISSELL</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-title2 mb-4">
                  House Work: Elevation | <span className="accent-underline">The Film</span>.
                </h3>
                <p className="text-body mb-6">
                  "Once upon a time, there lived a man who lived on a planet called "Planet Music..."
                </p>
                <p className="text-body mb-8">
                  "House Work: Elevation" explores house music's origins and its future, blending sound and 
                  visuals to create a cinematic experience. Each track reveals a new vignette, capturing the pulse 
                  of dance and the evolution of a genre.
                </p>
                <p className="text-body mb-8">
                  This film marks a pivotal chapter in my journey as a musician and storyteller. Step into the story
                  —watch it now on YouTube and experience the mix in a whole new way.
                </p>
                <div className="flex gap-4">
                  <button className="btn-primary">
                    Watch The Film
                  </button>
                  <button className="btn-secondary">
                    Experience The Mix
                  </button>
                </div>
              </div>
            </div>

            {/* Live Cuts Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-title2 mb-6">Live <span className="accent-underline">cuts</span>.</h3>
              </div>
              
              <div>
                <h4 className="text-title3 mb-4">Live at Broken Land</h4>
                <p className="text-body mb-6">
                  Experience a raw, in-the-moment set from Broken Land. A blend of live energy and seamless 
                  transitions that bring you deeper into the journey. Click below to join me at upcoming 
                  shows and be part of the story weekly as it unfolds.
                </p>
                <button className="btn-primary">
                  Join The Journey
                </button>
              </div>

              <div>
                <h4 className="text-title3 mb-4">Streaming on Bigo Live</h4>
                <p className="text-body mb-6">
                  Engaging live with the Bigo Live community, bringing tracks like "Little L" from 
                  "nostalgia trap" into the mix.
                </p>
                <p className="text-body mb-6">
                  Catch a story, vibe with a mix, and see what's coming.
                </p>
                <button className="btn-primary">
                  Explore The Mixes
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMixes.map((mix) => (
              <Link
                key={mix.title}
                to={mix.link}
                className="group rounded-xl overflow-hidden border border-border-secondary hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img src={mix.image} alt={mix.title} className="w-full aspect-video object-cover" />
                  <mix.icon className="absolute top-3 right-3 w-6 h-6 text-white drop-shadow" />
                </div>
                <div className="p-4">
                  <h4 className="text-title3 mb-1">{mix.title}</h4>
                  <p className="text-subheadline text-foreground-secondary">{mix.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="section-padding">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-title1 mb-8">
                My <span className="accent-underline">story</span>.
              </h2>
              <div className="space-y-6 text-body">
                <p>
                  <strong>Zack Bissell</strong> is an innovative multi-genre DJ, producer, and singer based in Brooklyn, 
                  holding a residency and weekly events at many establishments including Broken Land, and Talon. 
                  Known for his dynamic storytelling through music, Zack crafts immersive sets that blend indie dance, 
                  house, and other genres, taking listeners on a thematic journey.
                </p>
                <p>
                  Each performance is a storytelling journey, characterized by groovy basslines, surprising transitions, 
                  and a deep understanding of musical narrative.
                </p>
                <p>
                  His meticulous approach to recording and high-quality audio mixes available on Mixcloud have consistently 
                  charted in the top 100 global DJ set charts. Notably, his mix "nostalgia trap, reality slap" reached{' '}
                  <span className="accent-underline">#1 on the Global Dance Punk</span> charts and{' '}
                  <span className="accent-underline">#43 on the Global Indie Dance/Alternative Dance</span> charts.
                </p>
                <p>
                  Whether it's a high-energy set at a packed club or a thoughtfully curated mix for an online audience, 
                  Zack Bissell's passion for music and storytelling shines through, making him a standout figure in the 
                  dance music community.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-gray-200 rounded-lg">
              {/* Placeholder for artist photo */}
              <div className="w-full h-full flex items-center justify-center text-foreground-tertiary">
                Artist Photo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intercepted Transcript Example */}
      <section className="section-padding bg-black">
        <InterceptedTranscript
          timestamp="2023-04-17T22:38:49Z"
          speaker="ETAB Recon Unit | Seville Node"
          text={`Confirmed anomaly phase-lock at 22:37:53. Source signal traced to Terry Hunter remix injection.\nWaveform rupture sustained for 112 seconds before stabilization.\nMotion artifacts suggest dual-timeline bleed through.\nRequesting contact with EU Quantum Tribunal.`}
          audioSrc="/audio/etab_transmission_1.mp3"
        />
      </section>
    </div>
  </>
  );
};

export default Home;
