/**
 * Spatial Gesture Recognition System
 * Apple-level touch interactions and spatial gestures for immersive experiences
 */

import { useRef, useEffect, useCallback } from 'react';
import { useHapticFeedback } from './haptics';

interface GestureEvent {
  type: 'swipe' | 'pinch' | 'rotate' | 'longPress' | 'doubleTap' | 'threeTap' | 'hover3D';
  direction?: 'up' | 'down' | 'left' | 'right';
  velocity?: number;
  scale?: number;
  rotation?: number;
  center?: { x: number; y: number };
  force?: number;
  worldSpace?: { x: number; y: number; z: number };
}

interface GestureOptions {
  enableSwipe?: boolean;
  enablePinch?: boolean;
  enableRotation?: boolean;
  enableLongPress?: boolean;
  enableDoubleTap?: boolean;
  enableHover3D?: boolean;
  swipeThreshold?: number;
  longPressDelay?: number;
  hapticFeedback?: boolean;
  worldContext?: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
}

interface TouchPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  force?: number;
}

class SpatialGestureRecognizer {
  private element: HTMLElement | null = null;
  private options: GestureOptions = {};
  private onGesture: ((event: GestureEvent) => void) | null = null;
  
  private touches: Map<number, TouchPoint> = new Map();
  private gestureStartTime = 0;
  private lastTapTime = 0;
  private tapCount = 0;
  private longPressTimer: NodeJS.Timeout | null = null;
  private isGesturing = false;
  
  private initialDistance = 0;
  private initialAngle = 0;
  private lastScale = 1;
  private lastRotation = 0;
  
  private haptics = {
    trigger: () => {},
    disco: () => {},
    nostalgia: () => {},
    rolemodel: () => {},
    elevation: () => {},
  };

  constructor(
    element: HTMLElement,
    options: GestureOptions = {},
    onGesture: (event: GestureEvent) => void
  ) {
    this.element = element;
    this.options = { ...this.getDefaultOptions(), ...options };
    this.onGesture = onGesture;
    
    this.initializeHaptics();
    this.bindEvents();
  }

  private getDefaultOptions(): GestureOptions {
    return {
      enableSwipe: true,
      enablePinch: true,
      enableRotation: true,
      enableLongPress: true,
      enableDoubleTap: true,
      enableHover3D: true,
      swipeThreshold: 50,
      longPressDelay: 500,
      hapticFeedback: true,
    };
  }

  private initializeHaptics(): void {
    if (typeof window !== 'undefined') {
      import('./haptics').then(({ useHapticFeedback }) => {
        const hapticAPI = useHapticFeedback();
        this.haptics = hapticAPI;
      });
    }
  }

  private bindEvents(): void {
    if (!this.element) return;

    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
    this.element.addEventListener('touchcancel', this.handleTouchCancel.bind(this));

    // Mouse events for desktop
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });

    // Device orientation for spatial awareness
    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    }
  }

  private handleTouchStart(event: TouchEvent): void {
    event.preventDefault();
    
    this.isGesturing = true;
    this.gestureStartTime = Date.now();
    
    // Store touch points
    Array.from(event.touches).forEach(touch => {
      this.touches.set(touch.identifier, {
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
        force: touch.force,
      });
    });

    // Handle long press
    if (this.options.enableLongPress && event.touches.length === 1) {
      this.longPressTimer = setTimeout(() => {
        this.triggerGesture({
          type: 'longPress',
          center: { x: event.touches[0].clientX, y: event.touches[0].clientY },
          force: event.touches[0].force,
        });
      }, this.options.longPressDelay);
    }

    // Initialize multi-touch gestures
    if (event.touches.length === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      this.initialDistance = this.getDistance(touch1, touch2);
      this.initialAngle = this.getAngle(touch1, touch2);
      this.lastScale = 1;
      this.lastRotation = 0;
    }

    // Haptic feedback for touch start
    if (this.options.hapticFeedback) {
      this.triggerHapticFeedback('light');
    }
  }

  private handleTouchMove(event: TouchEvent): void {
    event.preventDefault();

    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    // Handle pinch and rotation
    if (event.touches.length === 2 && this.touches.size === 2) {
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      
      const currentDistance = this.getDistance(touch1, touch2);
      const currentAngle = this.getAngle(touch1, touch2);
      
      // Pinch gesture
      if (this.options.enablePinch) {
        const scale = currentDistance / this.initialDistance;
        if (Math.abs(scale - this.lastScale) > 0.01) {
          this.triggerGesture({
            type: 'pinch',
            scale,
            center: this.getCenter(touch1, touch2),
          });
          this.lastScale = scale;
        }
      }

      // Rotation gesture
      if (this.options.enableRotation) {
        const rotation = currentAngle - this.initialAngle;
        if (Math.abs(rotation - this.lastRotation) > 0.1) {
          this.triggerGesture({
            type: 'rotate',
            rotation,
            center: this.getCenter(touch1, touch2),
          });
          this.lastRotation = rotation;
        }
      }
    }
  }

  private handleTouchEnd(event: TouchEvent): void {
    const touchEndTime = Date.now();
    const touchDuration = touchEndTime - this.gestureStartTime;

    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }

    // Handle tap gestures
    if (touchDuration < 300 && event.changedTouches.length === 1) {
      const currentTime = Date.now();
      
      if (currentTime - this.lastTapTime < 500) {
        this.tapCount++;
      } else {
        this.tapCount = 1;
      }
      
      this.lastTapTime = currentTime;
      
      setTimeout(() => {
        if (this.tapCount === 2 && this.options.enableDoubleTap) {
          this.triggerGesture({
            type: 'doubleTap',
            center: { 
              x: event.changedTouches[0].clientX, 
              y: event.changedTouches[0].clientY 
            },
          });
        } else if (this.tapCount === 3) {
          this.triggerGesture({
            type: 'threeTap',
            center: { 
              x: event.changedTouches[0].clientX, 
              y: event.changedTouches[0].clientY 
            },
          });
        }
        this.tapCount = 0;
      }, 300);
    }

    // Handle swipe gestures
    if (this.options.enableSwipe && this.touches.size === 1) {
      const touchId = event.changedTouches[0].identifier;
      const startTouch = this.touches.get(touchId);
      
      if (startTouch) {
        const endTouch = event.changedTouches[0];
        const deltaX = endTouch.clientX - startTouch.x;
        const deltaY = endTouch.clientY - startTouch.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const velocity = distance / touchDuration;
        
        if (distance > this.options.swipeThreshold!) {
          let direction: 'up' | 'down' | 'left' | 'right';
          
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'right' : 'left';
          } else {
            direction = deltaY > 0 ? 'down' : 'up';
          }
          
          this.triggerGesture({
            type: 'swipe',
            direction,
            velocity,
            center: { x: endTouch.clientX, y: endTouch.clientY },
          });
        }
      }
    }

    // Remove ended touches
    Array.from(event.changedTouches).forEach(touch => {
      this.touches.delete(touch.identifier);
    });

    if (this.touches.size === 0) {
      this.isGesturing = false;
    }
  }

  private handleTouchCancel(event: TouchEvent): void {
    this.touches.clear();
    this.isGesturing = false;
    
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    // Simulate touch for mouse interactions
    this.touches.set(0, {
      id: 0,
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
    });
    
    this.gestureStartTime = Date.now();
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.options.enableHover3D && !this.isGesturing) {
      // Create 3D hover effect based on mouse position
      const rect = this.element!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (event.clientX - centerX) / (rect.width / 2);
      const y = (event.clientY - centerY) / (rect.height / 2);
      const z = Math.sqrt(x * x + y * y);
      
      this.triggerGesture({
        type: 'hover3D',
        worldSpace: { x, y, z: Math.min(z, 1) },
      });
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    const startTouch = this.touches.get(0);
    if (startTouch) {
      const touchDuration = Date.now() - this.gestureStartTime;
      const deltaX = event.clientX - startTouch.x;
      const deltaY = event.clientY - startTouch.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Handle mouse swipe
      if (distance > this.options.swipeThreshold! && this.options.enableSwipe) {
        let direction: 'up' | 'down' | 'left' | 'right';
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }
        
        this.triggerGesture({
          type: 'swipe',
          direction,
          velocity: distance / touchDuration,
          center: { x: event.clientX, y: event.clientY },
        });
      }
    }
    
    this.touches.delete(0);
  }

  private handleWheel(event: WheelEvent): void {
    if (this.options.enablePinch) {
      event.preventDefault();
      
      const scale = event.deltaY > 0 ? 0.9 : 1.1;
      
      this.triggerGesture({
        type: 'pinch',
        scale,
        center: { x: event.clientX, y: event.clientY },
      });
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent): void {
    // Use device orientation for spatial effects
    if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      const x = event.gamma / 90; // Tilt left/right
      const y = event.beta / 90;  // Tilt forward/back
      const z = event.alpha / 360; // Rotation
      
      this.triggerGesture({
        type: 'hover3D',
        worldSpace: { x, y, z },
      });
    }
  }

  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private getAngle(touch1: Touch, touch2: Touch): number {
    return Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);
  }

  private getCenter(touch1: Touch, touch2: Touch): { x: number; y: number } {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  }

  private triggerGesture(gesture: GestureEvent): void {
    if (this.onGesture) {
      this.onGesture(gesture);
    }

    // Trigger haptic feedback for specific gestures
    if (this.options.hapticFeedback) {
      switch (gesture.type) {
        case 'doubleTap':
        case 'threeTap':
          this.triggerHapticFeedback('medium');
          break;
        case 'longPress':
          this.triggerHapticFeedback('heavy');
          break;
        case 'swipe':
          this.triggerHapticFeedback('light');
          break;
      }
    }
  }

  private triggerHapticFeedback(intensity: 'light' | 'medium' | 'heavy'): void {
    if (this.options.worldContext) {
      this.haptics[this.options.worldContext]();
    } else {
      this.haptics.trigger({ intensity });
    }
  }

  public destroy(): void {
    if (!this.element) return;

    // Remove all event listeners
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
    this.element.removeEventListener('touchcancel', this.handleTouchCancel.bind(this));
    this.element.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    this.element.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    this.element.removeEventListener('wheel', this.handleWheel.bind(this));

    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
  }
}

// React hook for spatial gestures
export function useSpatialGestures(
  options: GestureOptions = {},
  onGesture?: (event: GestureEvent) => void
) {
  const elementRef = useRef<HTMLElement>(null);
  const recognizerRef = useRef<SpatialGestureRecognizer | null>(null);

  const handleGesture = useCallback((event: GestureEvent) => {
    onGesture?.(event);
  }, [onGesture]);

  useEffect(() => {
    if (elementRef.current) {
      recognizerRef.current = new SpatialGestureRecognizer(
        elementRef.current,
        options,
        handleGesture
      );
    }

    return () => {
      recognizerRef.current?.destroy();
    };
  }, [options, handleGesture]);

  return elementRef;
}

export type { GestureEvent, GestureOptions };