import React, { useState } from 'react';
import Layout from '@/components/global/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Image as ImageIcon, 
  Video, 
  FileText,
  Camera,
  Palette,
  Play,
  ExternalLink,
  Grid3X3,
  List
} from 'lucide-react';

const Media = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Media', count: 24 },
    { id: 'photos', label: 'Press Photos', count: 12 },
    { id: 'logos', label: 'Logos & Branding', count: 6 },
    { id: 'videos', label: 'Performance Videos', count: 4 },
    { id: 'press', label: 'Press Materials', count: 2 }
  ];

  const mediaAssets = [
    {
      id: 1,
      title: "Zack Bissell - Professional Headshot",
      category: "photos",
      type: "image",
      resolution: "4000x6000",
      format: "JPG",
      size: "2.4 MB",
      description: "High-resolution professional headshot for press and promotional use",
      downloadUrl: "/media/press/zack-bissell-headshot-4k.jpg",
      thumbnailUrl: "/media/thumbnails/zack-headshot-thumb.jpg",
      tags: ["headshot", "professional", "press"]
    },
    {
      id: 2,
      title: "Lab Obsidian Logo - Primary",
      category: "logos", 
      type: "vector",
      resolution: "Vector",
      format: "SVG",
      size: "24 KB",
      description: "Primary Lab Obsidian logo in vector format",
      downloadUrl: "/media/logos/lab-obsidian-primary.svg",
      thumbnailUrl: "/media/thumbnails/lab-obsidian-thumb.jpg",
      tags: ["logo", "branding", "vector"]
    },
    {
      id: 3,
      title: "Brooklyn Warehouse Performance",
      category: "photos",
      type: "image", 
      resolution: "6000x4000",
      format: "JPG",
      size: "5.2 MB",
      description: "Live performance shot from 4:45 Somewhere in Brooklyn warehouse set",
      downloadUrl: "/media/press/brooklyn-warehouse-performance.jpg",
      thumbnailUrl: "/media/thumbnails/brooklyn-performance-thumb.jpg", 
      tags: ["performance", "live", "brooklyn"]
    },
    {
      id: 4,
      title: "Disco Ascension Mix - Behind the Scenes",
      category: "videos",
      type: "video",
      resolution: "1920x1080",
      format: "MP4",
      size: "45.7 MB",
      description: "Behind-the-scenes footage of creating the Disco Ascension mix",
      downloadUrl: "/media/videos/disco-ascension-bts.mp4",
      thumbnailUrl: "/media/thumbnails/disco-bts-thumb.jpg",
      tags: ["behind-the-scenes", "disco ascension", "studio"]
    },
    {
      id: 5,
      title: "Apple Store DJ Residency",
      category: "photos",
      type: "image",
      resolution: "4000x3000", 
      format: "JPG",
      size: "3.1 MB",
      description: "Performance at Apple Fifth Avenue DJ residency",
      downloadUrl: "/media/press/apple-store-residency.jpg",
      thumbnailUrl: "/media/thumbnails/apple-residency-thumb.jpg",
      tags: ["apple", "residency", "performance"]
    },
    {
      id: 6,
      title: "Zack Bissell Logo - Monogram",
      category: "logos",
      type: "vector", 
      resolution: "Vector",
      format: "SVG",
      size: "18 KB",
      description: "Personal monogram logo for Zack Bissell",
      downloadUrl: "/media/logos/zb-monogram.svg",
      thumbnailUrl: "/media/thumbnails/zb-monogram-thumb.jpg",
      tags: ["monogram", "personal", "logo"]
    },
    {
      id: 7,
      title: "Electronic Press Kit - Full Package",
      category: "press",
      type: "document",
      resolution: "PDF",
      format: "PDF", 
      size: "8.9 MB",
      description: "Complete electronic press kit with bio, photos, and achievements",
      downloadUrl: "/media/press/zack-bissell-epk-full.pdf",
      thumbnailUrl: "/media/thumbnails/epk-thumb.jpg",
      tags: ["epk", "press kit", "comprehensive"]
    },
    {
      id: 8,
      title: "Nostalgia Trap Mix - Visual Story",
      category: "videos",
      type: "video",
      resolution: "1920x1080",
      format: "MP4",
      size: "67.3 MB", 
      description: "Visual narrative accompaniment to the chart-topping Nostalgia Trap mix",
      downloadUrl: "/media/videos/nostalgia-trap-visual.mp4",
      thumbnailUrl: "/media/thumbnails/nostalgia-visual-thumb.jpg",
      tags: ["nostalgia trap", "visual", "narrative"]
    }
  ];

  const filteredAssets = selectedCategory === 'all' 
    ? mediaAssets 
    : mediaAssets.filter(asset => asset.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'vector': return <Palette className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      default: return <ImageIcon className="h-4 w-4" />;
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
                Media Assets
              </Badge>
              <h1 className="text-large-title font-bold text-foreground mb-6">
                Press Media & Assets
              </h1>
              <p className="text-title2 text-foreground-secondary mb-8 max-w-3xl mx-auto">
                High-resolution photos, logos, videos, and press materials ready for 
                download and use by media, promoters, and venues.
              </p>
            </div>
          </div>
        </section>

        {/* Filter and View Controls */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    {category.label}
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground-secondary">View:</span>
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 px-3"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 px-3"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Grid/List */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-6xl">
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div key={asset.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <div className="text-muted-foreground">
                        {getTypeIcon(asset.type)}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-sm leading-tight">
                          {asset.title}
                        </h3>
                        <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">
                          {asset.format}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-secondary mb-3 line-clamp-2">
                        {asset.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>{asset.resolution}</span>
                        <span>{asset.size}</span>
                      </div>
                      <Button size="sm" className="w-full flex items-center gap-2">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssets.map((asset) => (
                  <div key={asset.id} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(asset.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-foreground">
                            {asset.title}
                          </h3>
                          <Badge variant="outline" className="text-xs ml-4">
                            {asset.format}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground-secondary mb-2">
                          {asset.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{asset.resolution}</span>
                          <span>{asset.size}</span>
                          <div className="flex gap-1">
                            {asset.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="flex items-center gap-2 flex-shrink-0">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-title1 font-bold text-foreground mb-6">
                Usage Guidelines
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Camera className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Photo Usage</h3>
                </div>
                <ul className="text-sm text-foreground-secondary space-y-2">
                  <li>• High-resolution images suitable for print and digital</li>
                  <li>• Credit: "Photo courtesy of Zack Bissell"</li>
                  <li>• No alterations without prior approval</li>
                  <li>• Available in multiple formats and resolutions</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Logo & Branding</h3>
                </div>
                <ul className="text-sm text-foreground-secondary space-y-2">
                  <li>• Vector formats for scalable reproduction</li>
                  <li>• Maintain clear space and proportions</li>
                  <li>• Available in multiple colorways</li>
                  <li>• Contact for custom brand applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Additional Media */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-title1 font-bold text-foreground mb-6">
              Need Additional Media?
            </h2>
            <p className="text-body-large text-foreground-secondary mb-8 max-w-2xl mx-auto">
              Looking for custom assets, higher resolutions, or specific content? 
              We're here to support your media needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Contact for Media
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                View Full EPK
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Media;