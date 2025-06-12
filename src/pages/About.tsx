
import React from 'react';
import { Helmet } from 'react-helmet';
import { Download, Music, Users, Award } from 'lucide-react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <Helmet>
        <title>About – Zack Bissell</title>
      </Helmet>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
              The Story Behind the Sound
            </h1>
            <p className="text-xl text-gray-300">
              Epic, detailed, written for industry and superfans
            </p>
          </div>

          {/* Quick EPK Download */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Electronic Press Kit</h3>
                <p className="text-gray-300">Download the complete EPK for booking and press</p>
              </div>
              <button className="mt-4 md:mt-0 bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download EPK
              </button>
            </div>
          </div>

          {/* Short Bio for Quick Copy */}
          <div className="bg-gray-900/50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-amber-500 mb-6">Quick Bio (For Event Listings)</h2>
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-200 leading-relaxed">
                <strong>Zack Bissell</strong> is a Brooklyn-based DJ, producer, and creative powerhouse. Fusing house, disco, and indie dance with narrative storytelling, Zack crafts unforgettable sets that move crowds emotionally and physically. A former Broadway actor and founder of Lab Obsidian, Zack is renowned for his technical precision, relentless innovation, and storytelling vision. If you want to book a headliner who will transform your dance floor into a cinematic journey—this is your guy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Highlights */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Press & <span className="text-amber-500">Highlights</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Apple NYC Residencies</h3>
              <p className="text-gray-300">Apple Fifth Avenue, Williamsburg</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Featured Coverage</h3>
              <p className="text-gray-300">Resident Advisor, Mixcloud, VerseOne</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Notable Collaborations</h3>
              <p className="text-gray-300">DJ CherishTheLuv, Jasmine Solano, Just Blaze</p>
            </div>
          </div>

          {/* Detailed Achievements */}
          <div className="bg-gray-900/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-amber-500 mb-6">Career Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Apple NYC DJ residencies across multiple locations
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Featured artist on Resident Advisor
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Mixcloud spotlight and featured mixes
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    VerseOne Distribution partnership
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-gray-200">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Founder and creative director of Lab Obsidian
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Former Broadway actor and performer
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Collaborations with Grammy-nominated artists
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                    Brooklyn underground scene pioneer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long Form Bio Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            The <span className="text-amber-500">Complete Story</span>
          </h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-gray-900/30 rounded-xl p-8 mb-8">
              <p className="text-gray-200 leading-relaxed mb-6">
                <strong className="text-amber-500">Zack Bissell</strong> isn't just a DJ—he's a sonic architect, a narrative craftsman, and Brooklyn's most compelling storytelling force behind the decks. With roots that stretch from Broadway stages to underground warehouse raves, Zack brings a unique theatrical sensibility to electronic music that transforms every set into an unforgettable cinematic experience.
              </p>

              <p className="text-gray-200 leading-relaxed mb-6">
                As a former Broadway actor, Zack understands the power of narrative arc, emotional buildup, and perfect timing. These theatrical instincts, combined with technical precision and an encyclopedic knowledge of house, disco, and indie dance, create sets that don't just move bodies—they tell stories that resonate long after the last beat drops.
              </p>

              <p className="text-gray-200 leading-relaxed mb-6">
                Based in Brooklyn and deeply embedded in the city's underground scene, Zack has become a fixture at the most respected venues and events. His Apple NYC residencies at flagship locations including Apple Fifth Avenue and Williamsburg have showcased his ability to adapt his storytelling approach to any crowd, while his featured coverage on Resident Advisor and Mixcloud has brought his narrative-driven approach to a global audience.
              </p>

              <p className="text-gray-200 leading-relaxed mb-6">
                As the founder and creative director of <strong className="text-amber-500">Lab Obsidian</strong>, Zack has created more than just a record label—it's a creative engine that supports emerging artists and pushes the boundaries of what electronic music can be. This platform allows him to nurture new talent while developing his own artistic vision, creating a ecosystem of innovation that extends far beyond his individual performances.
              </p>

              <p className="text-gray-200 leading-relaxed mb-6">
                Zack's collaborative spirit has led to partnerships with Grammy-nominated artists including Just Blaze, as well as deep creative relationships with rising stars like DJ CherishTheLuv and Jasmine Solano. These collaborations showcase his ability to adapt his storytelling approach across genres while maintaining the emotional core that defines his signature sound.
              </p>

              <p className="text-gray-200 leading-relaxed">
                Whether he's crafting the conspiracy-laden narrative of "Disco Ascension," guiding listeners through the emotional minefield of "Nostalgia Trap," or elevating a crowd to new heights with "House Work: Elevation," Zack Bissell delivers more than entertainment—he creates experiences that become part of your personal mythology. In a world of DJs who simply play tracks, Zack builds worlds, tells stories, and creates legends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Download the full EPK or get in touch to discuss your next event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-500 text-black px-8 py-4 rounded-lg text-xl font-semibold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
              <Download className="w-6 h-6" />
              Download Full EPK
            </button>
            <a 
              href="/booking"
              className="border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-amber-500 hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              Start the Conversation
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
