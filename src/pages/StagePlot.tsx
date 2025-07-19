import React, { useState } from 'react';
import Layout from '@/components/global/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Mic,
  Volume2,
  Monitor,
  Zap,
  Headphones,
  Laptop,
  Cable,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin
} from 'lucide-react';

const StagePlot = () => {
  const [selectedSetup, setSelectedSetup] = useState('standard');

  const setupTypes = [
    {
      id: 'standard',
      name: 'Standard Club Set',
      duration: '60-90 minutes',
      description: 'Perfect for nightclubs, bars, and standard venue bookings'
    },
    {
      id: 'festival',
      name: 'Festival Performance', 
      duration: '45-60 minutes',
      description: 'Optimized for festival stages and outdoor events'
    },
    {
      id: 'extended',
      name: 'Extended Journey',
      duration: '2-4 hours',
      description: 'Deep narrative sets for special events and residencies'
    }
  ];

  const equipmentRequirements = {
    essential: [
      { item: 'Pioneer CDJ-3000 (x2)', description: 'Latest generation players preferred', priority: 'critical' },
      { item: 'Pioneer DJM-900NXS2 or DJM-A9', description: 'Four-channel mixer minimum', priority: 'critical' },
      { item: 'Monitor speakers', description: 'Quality wedge monitors positioned at DJ booth', priority: 'critical' },
      { item: 'Professional headphones available', description: 'Backup headphones (Sennheiser HD25 or equivalent)', priority: 'important' }
    ],
    technical: [
      { item: 'Stable internet connection', description: 'For streaming services and track access', priority: 'critical' },
      { item: 'Power outlets near booth', description: 'Minimum 4 grounded outlets', priority: 'critical' },
      { item: 'Lighting control integration', description: 'Basic lighting control access preferred', priority: 'preferred' },
      { item: 'Recording output', description: 'Clean board feed for mix recording', priority: 'preferred' }
    ]
  };

  const technicalSpecs = [
    {
      category: 'Audio Output',
      icon: <Volume2 className="h-5 w-5" />,
      specs: [
        'Output Level: Line level (+4dBu)',
        'Impedance: 10kΩ unbalanced',
        'Connectors: XLR or RCA outputs',
        'Frequency Response: 20Hz - 20kHz'
      ]
    },
    {
      category: 'Power Requirements',
      icon: <Zap className="h-5 w-5" />,
      specs: [
        'Voltage: 110-240V AC',
        'Power consumption: ~300W total',
        'Grounded outlets required',
        'Surge protection recommended'
      ]
    },
    {
      category: 'Physical Setup',
      icon: <MapPin className="h-5 w-5" />,
      specs: [
        'Booth space: 6ft x 3ft minimum',
        'Table height: 42-44 inches',
        'Cable management required',
        'Ambient temperature: 65-75°F'
      ]
    },
    {
      category: 'Connectivity',
      icon: <Cable className="h-5 w-5" />,
      specs: [
        'Ethernet: Gigabit preferred',
        'USB ports: Multiple USB-A',
        'Audio routing: Booth monitor control',
        'Emergency backup: Analog input available'
      ]
    }
  ];

  const rider = {
    hospitality: [
      '2x bottles of room temperature water',
      'Clean towel',
      'Designated green room/artist area',
      'Parking arrangement (if applicable)'
    ],
    scheduling: [
      'Load-in time: 30 minutes before set',
      'Sound check: 15 minutes recommended', 
      'Break between sets: 15 minutes minimum',
      'Load-out: Immediate post-performance'
    ],
    additional: [
      'Photo/video permissions discussed in advance',
      'Merchandise table space (if applicable)',
      'Guest list allocation as per contract',
      'Contact person available during event'
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'important': return 'default';
      case 'preferred': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'important': return <CheckCircle className="h-4 w-4" />;
      case 'preferred': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-6 text-sm font-medium">
                Technical Requirements
              </Badge>
              <h1 className="text-large-title font-bold text-foreground mb-6">
                Stage Plot & Technical Rider
              </h1>
              <p className="text-title2 text-foreground-secondary mb-8 max-w-3xl mx-auto">
                Professional technical requirements and stage specifications for 
                seamless performance delivery and optimal sound quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Stage Plot PDF
                </Button>
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Download Full Rider
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Type Selection */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-8">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Performance Setup Types
              </h2>
              <p className="text-body text-foreground-secondary">
                Select a performance type to view specific technical requirements
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {setupTypes.map((setup) => (
                <div
                  key={setup.id}
                  className={`p-6 rounded-lg border cursor-pointer transition-all ${
                    selectedSetup === setup.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedSetup(setup.id)}
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {setup.name}
                  </h3>
                  <Badge variant="outline" className="mb-3">
                    {setup.duration}
                  </Badge>
                  <p className="text-sm text-foreground-secondary">
                    {setup.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Requirements */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Equipment Requirements
              </h2>
              <p className="text-body text-foreground-secondary">
                Essential and preferred equipment for professional performance delivery
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Essential Equipment */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Mic className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Essential Equipment
                  </h3>
                </div>
                {equipmentRequirements.essential.map((req, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getPriorityIcon(req.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">
                          {req.item}
                        </h4>
                        <Badge variant={getPriorityColor(req.priority)} className="text-xs ml-2">
                          {req.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground-secondary">
                        {req.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Requirements */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Laptop className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Technical Setup
                  </h3>
                </div>
                {equipmentRequirements.technical.map((req, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getPriorityIcon(req.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">
                          {req.item}
                        </h4>
                        <Badge variant={getPriorityColor(req.priority)} className="text-xs ml-2">
                          {req.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground-secondary">
                        {req.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Technical Specifications
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      {spec.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {spec.category}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {spec.specs.map((item, specIndex) => (
                      <li key={specIndex} className="text-sm text-foreground-secondary flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Artist Rider */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-4">
                Artist Rider
              </h2>
              <p className="text-body text-foreground-secondary">
                Hospitality and logistical requirements for optimal performance conditions
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Hospitality */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Hospitality
                </h3>
                <ul className="space-y-3">
                  {rider.hospitality.map((item, index) => (
                    <li key={index} className="text-sm text-foreground-secondary flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scheduling */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Scheduling
                </h3>
                <ul className="space-y-3">
                  {rider.scheduling.map((item, index) => (
                    <li key={index} className="text-sm text-foreground-secondary flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Requirements */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  Additional
                </h3>
                <ul className="space-y-3">
                  {rider.additional.map((item, index) => (
                    <li key={index} className="text-sm text-foreground-secondary flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Download & Contact CTA */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-title1 font-bold text-foreground mb-6">
              Technical Support & Downloads
            </h2>
            <p className="text-body-large text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Need clarification on technical requirements or have specific venue constraints? 
              Our team is here to ensure seamless technical execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Download Complete Rider
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Technical Contact
              </Button>
            </div>
            <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-foreground-secondary">
                <strong>Note:</strong> All technical requirements are flexible and can be adapted 
                to venue capabilities. Please contact us to discuss any constraints or special arrangements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default StagePlot;