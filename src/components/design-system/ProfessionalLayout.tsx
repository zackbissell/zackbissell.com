/**
 * ProfessionalLayout - Apple HIG Compliant Layout Component
 * 
 * This component provides a consistent layout wrapper for professional pages
 * following Apple's Human Interface Guidelines with Liquid Glass design language.
 * It ensures proper spacing, typography, and accessibility across all professional sections.
 */

import React from 'react';
import { Helmet } from 'react-helmet';

interface ProfessionalLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  background?: 'primary' | 'secondary' | 'glass';
  maxWidth?: 'standard' | 'wide' | 'full';
}

const ProfessionalLayout: React.FC<ProfessionalLayoutProps> = ({
  children,
  title,
  description,
  className = '',
  background = 'primary',
  maxWidth = 'standard'
}) => {
  const getBackgroundStyle = () => {
    switch (background) {
      case 'secondary':
        return { background: 'var(--color-background-secondary)' };
      case 'glass':
        return {
          background: 'var(--glass-background)',
          backdropFilter: 'blur(var(--glass-blur))',
          WebkitBackdropFilter: 'blur(var(--glass-blur))',
          border: '1px solid var(--glass-border)'
        };
      default:
        return { background: 'var(--color-background-primary)' };
    }
  };

  const getContainerClass = () => {
    switch (maxWidth) {
      case 'wide':
        return 'container-apple' + ' max-w-7xl';
      case 'full':
        return 'w-full px-6';
      default:
        return 'container-apple';
    }
  };

  return (
    <>
      {title && (
        <Helmet>
          <title>{title} – Zack Bissell</title>
          {description && <meta name="description" content={description} />}
        </Helmet>
      )}
      
      <div 
        className={`min-h-screen ${className}`}
        style={getBackgroundStyle()}
      >
        {/* Navigation spacing offset */}
        <div style={{ height: 'var(--touch-target-min)' }} />
        
        {/* Main content area */}
        <main 
          className={getContainerClass()}
          style={{
            paddingTop: 'var(--space-8)',
            paddingBottom: 'var(--space-8)'
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

/**
 * ProfessionalSection - Apple HIG Section Component
 * 
 * Provides consistent section styling with proper spacing and typography hierarchy
 */
interface ProfessionalSectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  spacing?: 'compact' | 'normal' | 'large';
}

export const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({
  children,
  title,
  subtitle,
  className = '',
  spacing = 'normal'
}) => {
  const getPaddingStyle = () => {
    switch (spacing) {
      case 'compact':
        return { paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' };
      case 'large':
        return { paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-20)' };
      default:
        return { paddingTop: 'var(--space-16)', paddingBottom: 'var(--space-16)' };
    }
  };

  return (
    <section 
      className={className}
      style={getPaddingStyle()}
    >
      {(title || subtitle) && (
        <header style={{ marginBottom: 'var(--space-8)' }}>
          {title && (
            <h2
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-title1)',
                fontWeight: 'var(--font-weight-heavy)',
                lineHeight: 'var(--line-height-snug)',
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                marginBottom: subtitle ? 'var(--space-2)' : '0',
                textAlign: 'left'
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-body-large)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-relaxed)',
                color: 'var(--color-text-secondary)',
                textAlign: 'left'
              }}
            >
              {subtitle}
            </p>
          )}
        </header>
      )}
      
      <div>{children}</div>
    </section>
  );
};

/**
 * ProfessionalCard - Apple HIG Card Component
 * 
 * Glassmorphism card following Apple's Liquid Glass design language
 */
interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className = '',
  interactive = false,
  onClick
}) => {
  const baseStyle = {
    background: 'var(--glass-background)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--border-radius-large)',
    padding: 'var(--space-6)',
    boxShadow: 'var(--glass-shadow)',
    transition: 'all var(--motion-duration-quick) var(--motion-ease-standard)'
  };

  const interactiveStyle = interactive ? {
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
    }
  } : {};

  return (
    <div
      className={`${className} ${interactive ? 'hover:scale-105 active:scale-95' : ''}`}
      style={{ ...baseStyle, ...interactiveStyle }}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
};

/**
 * ProfessionalButton - Apple HIG Button Component
 * 
 * Follows Apple's button design principles with proper touch targets
 */
interface ProfessionalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const ProfessionalButton: React.FC<ProfessionalButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-apple-secondary';
      case 'tertiary':
        return 'btn-apple-secondary'; // Could be expanded with tertiary styles
      default:
        return 'btn-apple-primary';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: 'var(--font-size-callout)',
          padding: 'var(--space-2) var(--space-3)',
          minHeight: 'var(--space-6)'
        };
      case 'large':
        return {
          fontSize: 'var(--font-size-body-large)',
          padding: 'var(--space-4) var(--space-6)',
          minHeight: 'calc(var(--touch-target-min) + var(--space-1))'
        };
      default:
        return {
          fontSize: 'var(--font-size-body)',
          padding: 'var(--space-3) var(--space-4)',
          minHeight: 'var(--touch-target-min)'
        };
    }
  };

  return (
    <button
      type={type}
      className={`${getVariantStyle()} ${className} inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{
        ...getSizeStyle(),
        fontFamily: 'var(--font-family-base)',
        fontWeight: 'var(--font-weight-semibold)',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled}
    >
      {loading ? (
        <div
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      ) : null}
      {children}
    </button>
  );
};

export default ProfessionalLayout;