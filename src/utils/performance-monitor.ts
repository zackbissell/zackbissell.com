/**
 * Performance Monitoring System
 * Real-time metrics for WebGL optimization and quality scaling
 * Evidence-based performance management with Apple-level precision
 */

import React from 'react';
import { webglEngine, type PerformanceMetrics } from './webgl-engine';

interface PerformanceProfile {
  name: string;
  timestamp: number;
  fps: number;
  frameTime: number;
  memoryUsage: number;
  drawCalls: number;
  triangles: number;
  qualityLevel: 'low' | 'medium' | 'high';
  deviceCapabilities: {
    cores: number;
    memory: number;
    gpu: string;
    pixelRatio: number;
  };
}

interface PerformanceAlert {
  type: 'fps_drop' | 'memory_spike' | 'draw_calls_high' | 'thermal_throttling';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  metrics: PerformanceMetrics;
}

interface AdaptiveQualitySettings {
  particleCount: number;
  shadowQuality: 'disabled' | 'low' | 'medium' | 'high';
  postProcessing: boolean;
  antiAliasing: boolean;
  pixelRatio: number;
  renderScale: number;
}

class PerformanceMonitor {
  private profiles: PerformanceProfile[] = [];
  private alerts: PerformanceAlert[] = [];
  private isMonitoring = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private lastFrameTime = 0;
  private frameTimes: number[] = [];
  private qualitySettings: AdaptiveQualitySettings;
  
  // Performance thresholds
  private readonly thresholds = {
    fps: {
      critical: 15,
      low: 25,
      medium: 45,
      high: 55
    },
    memory: {
      warning: 150 * 1024 * 1024, // 150MB
      critical: 200 * 1024 * 1024  // 200MB
    },
    drawCalls: {
      warning: 500,
      critical: 1000
    }
  };

  // Device capability assessment
  private deviceCapabilities: {
    cores: number;
    memory: number;
    gpu: string;
    pixelRatio: number;
    effectiveType: string;
  };

  constructor() {
    this.deviceCapabilities = this.assessDeviceCapabilities();
    this.qualitySettings = this.getInitialQualitySettings();
  }

  /**
   * Assess device capabilities for optimization
   */
  private assessDeviceCapabilities() {
    const navigator = window.navigator as any;
    
    return {
      cores: navigator.hardwareConcurrency || 4,
      memory: navigator.deviceMemory || 4, // GB
      gpu: this.getGPUInfo(),
      pixelRatio: window.devicePixelRatio || 1,
      effectiveType: navigator.connection?.effectiveType || '4g'
    };
  }

  /**
   * Get GPU information for optimization
   */
  private getGPUInfo(): string {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) return 'unknown';
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'unknown';
      }
      
      return 'webgl-supported';
    } catch {
      return 'unknown';
    }
  }

  /**
   * Get initial quality settings based on device capabilities
   */
  private getInitialQualitySettings(): AdaptiveQualitySettings {
    const { cores, memory, gpu, pixelRatio } = this.deviceCapabilities;
    
    // Calculate performance score
    let score = 0;
    
    // CPU cores contribution
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;
    
    // Memory contribution
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;
    
    // GPU contribution (heuristic based on common GPU names)
    if (gpu.includes('RTX') || gpu.includes('Pro') || gpu.includes('Radeon RX')) score += 3;
    else if (gpu.includes('GTX') || gpu.includes('Radeon')) score += 2;
    else score += 1;
    
    // Determine quality level
    if (score >= 8) {
      return {
        particleCount: 500,
        shadowQuality: 'high',
        postProcessing: true,
        antiAliasing: true,
        pixelRatio: Math.min(pixelRatio, 2),
        renderScale: 1.0
      };
    } else if (score >= 5) {
      return {
        particleCount: 250,
        shadowQuality: 'medium',
        postProcessing: true,
        antiAliasing: true,
        pixelRatio: Math.min(pixelRatio, 1.5),
        renderScale: 0.9
      };
    } else {
      return {
        particleCount: 100,
        shadowQuality: 'low',
        postProcessing: false,
        antiAliasing: false,
        pixelRatio: 1,
        renderScale: 0.75
      };
    }
  }

  /**
   * Start performance monitoring
   */
  start(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.lastFrameTime = performance.now();
    
    // Monitor every 100ms for responsive adaptation
    this.monitoringInterval = setInterval(() => {
      this.collectMetrics();
      this.analyzePerformance();
      this.adaptQuality();
    }, 100);
    
    console.log('Performance monitoring started', this.deviceCapabilities);
  }

  /**
   * Stop performance monitoring
   */
  stop(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    console.log('Performance monitoring stopped');
  }

  /**
   * Collect current performance metrics
   */
  private collectMetrics(): void {
    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    this.frameTimes.push(frameTime);
    
    // Keep only last 10 frame times for averaging
    if (this.frameTimes.length > 10) {
      this.frameTimes.shift();
    }
    
    const metrics = webglEngine.getMetrics();
    const avgFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    
    const profile: PerformanceProfile = {
      name: `profile_${Date.now()}`,
      timestamp: currentTime,
      fps: metrics.fps,
      frameTime: avgFrameTime,
      memoryUsage: metrics.memoryUsage.total,
      drawCalls: metrics.drawCalls,
      triangles: metrics.triangles,
      qualityLevel: metrics.quality,
      deviceCapabilities: this.deviceCapabilities
    };
    
    this.profiles.push(profile);
    
    // Keep only last 100 profiles (10 seconds at 100ms intervals)
    if (this.profiles.length > 100) {
      this.profiles.shift();
    }
    
    this.lastFrameTime = currentTime;
  }

  /**
   * Analyze performance and generate alerts
   */
  private analyzePerformance(): void {
    if (this.profiles.length === 0) return;
    
    const latestProfile = this.profiles[this.profiles.length - 1];
    const metrics = webglEngine.getMetrics();
    
    // Check FPS thresholds
    if (latestProfile.fps < this.thresholds.fps.critical) {
      this.addAlert({
        type: 'fps_drop',
        severity: 'critical',
        message: `Critical FPS drop: ${latestProfile.fps} fps`,
        timestamp: Date.now(),
        metrics
      });
    } else if (latestProfile.fps < this.thresholds.fps.low) {
      this.addAlert({
        type: 'fps_drop',
        severity: 'high',
        message: `Low FPS detected: ${latestProfile.fps} fps`,
        timestamp: Date.now(),
        metrics
      });
    }
    
    // Check memory usage
    if (latestProfile.memoryUsage > this.thresholds.memory.critical) {
      this.addAlert({
        type: 'memory_spike',
        severity: 'critical',
        message: `Critical memory usage: ${Math.round(latestProfile.memoryUsage / 1024 / 1024)}MB`,
        timestamp: Date.now(),
        metrics
      });
    } else if (latestProfile.memoryUsage > this.thresholds.memory.warning) {
      this.addAlert({
        type: 'memory_spike',
        severity: 'medium',
        message: `High memory usage: ${Math.round(latestProfile.memoryUsage / 1024 / 1024)}MB`,
        timestamp: Date.now(),
        metrics
      });
    }
    
    // Check draw calls
    if (latestProfile.drawCalls > this.thresholds.drawCalls.critical) {
      this.addAlert({
        type: 'draw_calls_high',
        severity: 'high',
        message: `High draw calls: ${latestProfile.drawCalls}`,
        timestamp: Date.now(),
        metrics
      });
    }
    
    // Detect thermal throttling (heuristic)
    if (this.profiles.length >= 10) {
      const recent10 = this.profiles.slice(-10);
      const avgFPS = recent10.reduce((sum, p) => sum + p.fps, 0) / 10;
      const fpsVariance = recent10.reduce((sum, p) => sum + Math.pow(p.fps - avgFPS, 2), 0) / 10;
      
      if (fpsVariance > 100 && avgFPS < 30) {
        this.addAlert({
          type: 'thermal_throttling',
          severity: 'medium',
          message: 'Possible thermal throttling detected',
          timestamp: Date.now(),
          metrics
        });
      }
    }
  }

  /**
   * Add performance alert
   */
  private addAlert(alert: PerformanceAlert): void {
    this.alerts.push(alert);
    
    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }
    
    // Log critical alerts
    if (alert.severity === 'critical') {
      console.warn('Critical performance alert:', alert);
    }
  }

  /**
   * Adaptively adjust quality based on performance
   */
  private adaptQuality(): void {
    if (this.profiles.length < 5) return; // Need some data first
    
    const recent5 = this.profiles.slice(-5);
    const avgFPS = recent5.reduce((sum, p) => sum + p.fps, 0) / 5;
    const avgMemory = recent5.reduce((sum, p) => sum + p.memoryUsage, 0) / 5;
    
    let shouldDowngrade = false;
    let shouldUpgrade = false;
    
    // Downgrade conditions
    if (avgFPS < this.thresholds.fps.low ||
        avgMemory > this.thresholds.memory.warning ||
        this.hasRecentCriticalAlerts()) {
      shouldDowngrade = true;
    }
    
    // Upgrade conditions (only if performing well)
    if (avgFPS > this.thresholds.fps.high &&
        avgMemory < this.thresholds.memory.warning * 0.7 &&
        !this.hasRecentAlerts()) {
      shouldUpgrade = true;
    }
    
    if (shouldDowngrade) {
      this.downgradeQuality();
    } else if (shouldUpgrade) {
      this.upgradeQuality();
    }
  }

  /**
   * Check for recent critical alerts
   */
  private hasRecentCriticalAlerts(): boolean {
    const fiveSecondsAgo = Date.now() - 5000;
    return this.alerts.some(alert => 
      alert.timestamp > fiveSecondsAgo && alert.severity === 'critical'
    );
  }

  /**
   * Check for any recent alerts
   */
  private hasRecentAlerts(): boolean {
    const tenSecondsAgo = Date.now() - 10000;
    return this.alerts.some(alert => alert.timestamp > tenSecondsAgo);
  }

  /**
   * Downgrade visual quality for better performance
   */
  private downgradeQuality(): void {
    let changed = false;
    
    if (this.qualitySettings.shadowQuality !== 'disabled') {
      const qualities = ['high', 'medium', 'low', 'disabled'];
      const currentIndex = qualities.indexOf(this.qualitySettings.shadowQuality);
      if (currentIndex < qualities.length - 1) {
        this.qualitySettings.shadowQuality = qualities[currentIndex + 1] as any;
        changed = true;
      }
    }
    
    if (this.qualitySettings.particleCount > 50) {
      this.qualitySettings.particleCount = Math.max(50, Math.floor(this.qualitySettings.particleCount * 0.7));
      changed = true;
    }
    
    if (this.qualitySettings.renderScale > 0.5) {
      this.qualitySettings.renderScale = Math.max(0.5, this.qualitySettings.renderScale - 0.1);
      changed = true;
    }
    
    if (this.qualitySettings.postProcessing) {
      this.qualitySettings.postProcessing = false;
      changed = true;
    }
    
    if (changed) {
      this.applyQualitySettings();
      console.log('Quality downgraded:', this.qualitySettings);
    }
  }

  /**
   * Upgrade visual quality when performance allows
   */
  private upgradeQuality(): void {
    let changed = false;
    
    if (this.qualitySettings.particleCount < 500) {
      this.qualitySettings.particleCount = Math.min(500, Math.floor(this.qualitySettings.particleCount * 1.2));
      changed = true;
    }
    
    if (this.qualitySettings.renderScale < 1.0) {
      this.qualitySettings.renderScale = Math.min(1.0, this.qualitySettings.renderScale + 0.1);
      changed = true;
    }
    
    if (!this.qualitySettings.postProcessing && this.qualitySettings.particleCount > 200) {
      this.qualitySettings.postProcessing = true;
      changed = true;
    }
    
    if (this.qualitySettings.shadowQuality !== 'high') {
      const qualities = ['disabled', 'low', 'medium', 'high'];
      const currentIndex = qualities.indexOf(this.qualitySettings.shadowQuality);
      if (currentIndex > 0) {
        this.qualitySettings.shadowQuality = qualities[currentIndex - 1] as any;
        changed = true;
      }
    }
    
    if (changed) {
      this.applyQualitySettings();
      console.log('Quality upgraded:', this.qualitySettings);
    }
  }

  /**
   * Apply quality settings to the rendering engine
   */
  private applyQualitySettings(): void {
    // Notify WebGL engine of quality changes
    webglEngine.setTargetFPS(this.getTargetFPS());
    
    // Dispatch custom event for world scenes to respond
    window.dispatchEvent(new CustomEvent('qualityChange', {
      detail: this.qualitySettings
    }));
  }

  /**
   * Get target FPS based on current quality settings
   */
  private getTargetFPS(): number {
    if (this.qualitySettings.shadowQuality === 'high' && this.qualitySettings.postProcessing) {
      return 60;
    } else if (this.qualitySettings.shadowQuality !== 'disabled') {
      return 45;
    } else {
      return 30;
    }
  }

  /**
   * Get current performance summary
   */
  getPerformanceSummary(): {
    averageFPS: number;
    memoryUsage: number;
    qualityLevel: string;
    alertCount: number;
    recommendations: string[];
  } {
    if (this.profiles.length === 0) {
      return {
        averageFPS: 0,
        memoryUsage: 0,
        qualityLevel: 'unknown',
        alertCount: 0,
        recommendations: []
      };
    }
    
    const recent10 = this.profiles.slice(-10);
    const avgFPS = recent10.reduce((sum, p) => sum + p.fps, 0) / recent10.length;
    const avgMemory = recent10.reduce((sum, p) => sum + p.memoryUsage, 0) / recent10.length;
    
    const recentAlerts = this.alerts.filter(a => a.timestamp > Date.now() - 30000);
    
    const recommendations: string[] = [];
    
    if (avgFPS < 30) {
      recommendations.push('Consider lowering graphics quality for better performance');
    }
    
    if (avgMemory > this.thresholds.memory.warning) {
      recommendations.push('High memory usage detected - close other browser tabs');
    }
    
    if (recentAlerts.length > 5) {
      recommendations.push('Multiple performance issues detected - try refreshing the page');
    }
    
    return {
      averageFPS: Math.round(avgFPS),
      memoryUsage: Math.round(avgMemory / 1024 / 1024),
      qualityLevel: this.determineQualityLevel(),
      alertCount: recentAlerts.length,
      recommendations
    };
  }

  /**
   * Determine current quality level description
   */
  private determineQualityLevel(): string {
    const { shadowQuality, postProcessing, particleCount } = this.qualitySettings;
    
    if (shadowQuality === 'high' && postProcessing && particleCount >= 400) {
      return 'High';
    } else if (shadowQuality !== 'disabled' && particleCount >= 150) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }

  /**
   * Get current quality settings
   */
  getQualitySettings(): AdaptiveQualitySettings {
    return { ...this.qualitySettings };
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(): PerformanceAlert[] {
    const thirtySecondsAgo = Date.now() - 30000;
    return this.alerts.filter(alert => alert.timestamp > thirtySecondsAgo);
  }

  /**
   * Export performance data for analysis
   */
  exportPerformanceData(): {
    profiles: PerformanceProfile[];
    alerts: PerformanceAlert[];
    deviceCapabilities: any;
    qualitySettings: AdaptiveQualitySettings;
  } {
    return {
      profiles: [...this.profiles],
      alerts: [...this.alerts],
      deviceCapabilities: this.deviceCapabilities,
      qualitySettings: this.qualitySettings
    };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const [summary, setSummary] = React.useState(performanceMonitor.getPerformanceSummary());
  const [isMonitoring, setIsMonitoring] = React.useState(false);

  React.useEffect(() => {
    const updateSummary = () => {
      setSummary(performanceMonitor.getPerformanceSummary());
    };

    const interval = setInterval(updateSummary, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const startMonitoring = React.useCallback(() => {
    performanceMonitor.start();
    setIsMonitoring(true);
  }, []);

  const stopMonitoring = React.useCallback(() => {
    performanceMonitor.stop();
    setIsMonitoring(false);
  }, []);

  return {
    summary,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    qualitySettings: performanceMonitor.getQualitySettings(),
    recentAlerts: performanceMonitor.getRecentAlerts(),
    exportData: () => performanceMonitor.exportPerformanceData(),
  };
}

// Auto-initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.start();
}

export type { PerformanceProfile, PerformanceAlert, AdaptiveQualitySettings };