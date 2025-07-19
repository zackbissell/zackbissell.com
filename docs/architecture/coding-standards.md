# Coding Standards & Best Practices

**Document Type:** Architecture Component  
**Last Updated:** 2025-01-19  
**Target Audience:** Development Agents, Engineering Team  

## Overview

This document establishes coding standards and best practices for ZackBissell.com development. These standards ensure code quality, maintainability, and consistency while supporting the platform's immersive storytelling requirements and performance targets.

## TypeScript Standards

### Strict Configuration
```typescript
// tsconfig.json strict settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Type Definitions
```typescript
// Component Props Interface Standards
interface ComponentProps {
  // Required props first
  title: string;
  content: string;
  
  // Optional props with defaults
  className?: string;
  variant?: 'default' | 'world' | 'brutalist';
  world?: WorldTheme;
  
  // Event handlers
  onClick?: (event: MouseEvent) => void;
  onSubmit?: (data: FormData) => Promise<void>;
  
  // Children and composition
  children?: ReactNode;
  asChild?: boolean;
}

// Enum Definitions for Consistency
enum WorldTheme {
  DISCO = 'disco',
  NOSTALGIA = 'nostalgia',
  ROLEMODEL = 'rolemodel',
  ELEVATION = 'elevation'
}

// Utility Types for Story Worlds
type StoryWorldConfig = {
  id: WorldTheme;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    heading: string;
    body: string;
    mono: string;
  };
};

// Generic Types for Reusability
interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

// Branded Types for Type Safety
type EmailAddress = string & { __brand: 'email' };
type TrackID = string & { __brand: 'trackId' };
type Timestamp = number & { __brand: 'timestamp' };
```

### Error Handling Patterns
```typescript
// Result Type for Error Handling
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Async Function with Proper Error Handling
const fetchTrackData = async (trackId: TrackID): Promise<Result<TrackData>> => {
  try {
    const response = await fetch(`/api/tracks/${trackId}`);
    
    if (!response.ok) {
      return {
        success: false,
        error: new Error(`HTTP ${response.status}: ${response.statusText}`)
      };
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
};

// Usage with Error Handling
const handleTrackLoad = async (trackId: TrackID) => {
  const result = await fetchTrackData(trackId);
  
  if (result.success) {
    setTrackData(result.data);
  } else {
    console.error('Failed to load track:', result.error.message);
    // Handle error appropriately
  }
};
```

## React Component Standards

### Functional Component Structure
```typescript
// Standard Component Template
interface ComponentNameProps {
  // Props interface
}

const ComponentName = forwardRef<HTMLElement, ComponentNameProps>(
  ({ prop1, prop2, className, ...props }, ref) => {
    // Hooks (always at the top)
    const [state, setState] = useState<StateType>(initialState);
    const { data, isLoading, error } = useQuery(['key'], fetchFunction);
    const { reducedMotion } = useTheme();
    
    // Derived state and computed values
    const computedValue = useMemo(() => {
      return expensiveComputation(state);
    }, [state]);
    
    // Event handlers
    const handleClick = useCallback((event: MouseEvent) => {
      event.preventDefault();
      // Handle click
    }, []);
    
    // Effects (after all other hooks)
    useEffect(() => {
      // Side effects
      return () => {
        // Cleanup
      };
    }, []);
    
    // Early returns for loading/error states
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    
    // Main render
    return (
      <div
        ref={ref}
        className={cn('base-classes', className)}
        {...props}
      >
        {/* Component content */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

### Custom Hooks Standards
```typescript
// Custom Hook Template
interface UseHookOptions {
  option1?: boolean;
  option2?: string;
  onUpdate?: (value: any) => void;
}

interface UseHookReturn {
  value: any;
  setValue: (value: any) => void;
  isLoading: boolean;
  error: Error | null;
}

const useCustomHook = (
  initialValue: any,
  options: UseHookOptions = {}
): UseHookReturn => {
  const { option1 = false, option2 = 'default', onUpdate } = options;
  
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const updateValue = useCallback((newValue: any) => {
    setValue(newValue);
    onUpdate?.(newValue);
  }, [onUpdate]);
  
  return {
    value,
    setValue: updateValue,
    isLoading,
    error
  };
};
```

### World-Specific Component Standards
```typescript
// World Component Template
interface WorldComponentProps {
  world: WorldTheme;
  content: WorldContent;
  className?: string;
}

const WorldComponent = ({ world, content, className }: WorldComponentProps) => {
  // World-specific styling
  const worldStyles = {
    [WorldTheme.DISCO]: 'bg-amber-500 text-red-900',
    [WorldTheme.NOSTALGIA]: 'bg-purple-500 text-pink-100',
    [WorldTheme.ROLEMODEL]: 'bg-yellow-500 text-gray-900',
    [WorldTheme.ELEVATION]: 'bg-blue-500 text-amber-100'
  };
  
  return (
    <div 
      className={cn(
        'world-component',
        worldStyles[world],
        className
      )}
      data-world={world}
    >
      <WorldHero world={world} content={content.hero} />
      <WorldContent world={world} content={content.main} />
    </div>
  );
};
```

## CSS/Styling Standards

### Tailwind Class Organization
```typescript
// Class name organization pattern
const className = cn(
  // Layout (display, position, size)
  'flex items-center justify-between w-full h-16',
  
  // Spacing (margin, padding)
  'px-4 py-2 mb-6',
  
  // Typography
  'text-lg font-semibold leading-tight',
  
  // Colors and backgrounds
  'bg-background text-foreground border-border',
  
  // Effects (shadows, transforms)
  'shadow-lg rounded-lg transition-all duration-300',
  
  // Responsive modifiers
  'md:text-xl lg:px-8',
  
  // Pseudo-classes and states
  'hover:bg-accent hover:text-accent-foreground',
  'focus:outline-none focus:ring-2 focus:ring-ring',
  'disabled:opacity-50 disabled:pointer-events-none',
  
  // Custom/world-specific classes
  world && `world-${world}-styles`,
  
  // External className prop (always last)
  className
);
```

### CSS Custom Properties Standards
```css
/* Component-specific custom properties */
.component-name {
  /* Local properties with component prefix */
  --component-background: hsl(var(--background));
  --component-foreground: hsl(var(--foreground));
  --component-border-radius: var(--radius-md);
  
  /* Property usage */
  background-color: var(--component-background);
  color: var(--component-foreground);
  border-radius: var(--component-border-radius);
}

/* World-specific property overrides */
.world-disco .component-name {
  --component-background: hsl(var(--color-accent-primary));
  --component-foreground: hsl(var(--color-background));
}
```

## Performance Standards

### Memoization Guidelines
```typescript
// useMemo for expensive computations
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]); // Only recalculate when data changes

// useCallback for event handlers passed to child components
const handleSubmit = useCallback((formData: FormData) => {
  onSubmit(formData);
}, [onSubmit]);

// React.memo for component optimization
const OptimizedComponent = memo(({ prop1, prop2 }: Props) => {
  return <div>{/* Component content */}</div>;
}, (prevProps, nextProps) => {
  // Custom comparison function if needed
  return prevProps.prop1 === nextProps.prop1;
});
```

### Code Splitting Patterns
```typescript
// Route-based code splitting
const LazyPage = lazy(() => 
  import('../pages/PageName').then(module => ({
    default: module.PageName
  }))
);

// Component-based code splitting
const HeavyComponent = lazy(() => 
  import('../components/HeavyComponent').then(module => ({
    default: module.default
  }))
);

// Usage with Suspense
const App = () => (
  <Router>
    <Routes>
      <Route 
        path="/page" 
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <LazyPage />
          </Suspense>
        } 
      />
    </Routes>
  </Router>
);
```

## Testing Standards

### Component Testing Patterns
```typescript
// Test file structure
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';

// Test wrapper with providers
const TestWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider config={{ world: null, mode: 'light', reducedMotion: false, highContrast: false }}>
    <QueryClient>
      {children}
    </QueryClient>
  </ThemeProvider>
);

describe('ComponentName', () => {
  // Test data
  const mockProps = {
    title: 'Test Title',
    content: 'Test Content',
    onClick: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders with required props', () => {
    render(<ComponentName {...mockProps} />, { wrapper: TestWrapper });
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    render(<ComponentName {...mockProps} />, { wrapper: TestWrapper });
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies world-specific styling', () => {
    render(
      <ComponentName {...mockProps} world="disco" />, 
      { wrapper: TestWrapper }
    );
    
    const component = screen.getByTestId('component-name');
    expect(component).toHaveAttribute('data-world', 'disco');
  });
  
  it('supports accessibility requirements', () => {
    render(<ComponentName {...mockProps} />, { wrapper: TestWrapper });
    
    const component = screen.getByRole('button');
    expect(component).toHaveAccessibleName();
    expect(component).not.toHaveAttribute('aria-hidden', 'true');
  });
});
```

### Custom Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from '../useCustomHook';

describe('useCustomHook', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useCustomHook('initial'));
    
    expect(result.current.value).toBe('initial');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
  
  it('updates value correctly', () => {
    const { result } = renderHook(() => useCustomHook('initial'));
    
    act(() => {
      result.current.setValue('updated');
    });
    
    expect(result.current.value).toBe('updated');
  });
});
```

## File Organization Standards

### Directory Structure
```
src/
├── components/
│   ├── global/           # Layout components
│   ├── ui/              # Reusable UI components
│   └── worlds/          # World-specific components
│       └── [world-name]/
│           ├── index.ts              # Barrel export
│           ├── components/           # World components
│           ├── hooks/               # World-specific hooks
│           └── __tests__/           # World component tests
├── hooks/               # Global custom hooks
├── lib/                 # Utility functions
├── pages/               # Route components
├── styles/              # Global styles
├── types/               # TypeScript type definitions
└── utils/               # Helper functions
```

### Import/Export Standards
```typescript
// Barrel exports (index.ts files)
export { default as ComponentName } from './ComponentName';
export { default as AnotherComponent } from './AnotherComponent';
export type { ComponentNameProps } from './ComponentName';

// Named exports preferred over default exports
export const UtilityFunction = () => {
  // Implementation
};

export const CONSTANT_VALUE = 'value';

// Import organization
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 2. Internal utilities and types
import { cn } from '@/lib/utils';
import type { ComponentProps } from '@/types';

// 3. Components (UI, then local)
import { Button } from '@/components/ui/button';
import { ComponentName } from './ComponentName';

// 4. Relative imports last
import './styles.css';
```

## Code Documentation Standards

### JSDoc Comments
```typescript
/**
 * Audio player component with world theming and incident timeline support
 * 
 * @param src - Audio source URL (SoundCloud or Mixcloud embed)
 * @param title - Track title displayed in player
 * @param world - Story world theme for styling
 * @param incidents - Optional timeline incidents that sync with audio
 * @param onTimeUpdate - Callback fired when audio playback position changes
 * 
 * @example
 * ```tsx
 * <AudioPlayer
 *   src="https://soundcloud.com/track"
 *   title="Disco Ascension"
 *   world="disco"
 *   incidents={grooveSingularityIncidents}
 *   onTimeUpdate={(time) => updateTimeline(time)}
 * />
 * ```
 */
const AudioPlayer = ({ src, title, world, incidents, onTimeUpdate }: AudioPlayerProps) => {
  // Implementation
};

/**
 * Custom hook for managing story world theme state and transitions
 * 
 * @param initialWorld - Initial world theme to set
 * @param options - Configuration options for theme management
 * @returns Object containing current world, setter function, and theme utilities
 * 
 * @example
 * ```tsx
 * const { currentWorld, setWorld, applyWorldTheme } = useWorldTheme('disco');
 * ```
 */
const useWorldTheme = (initialWorld: WorldTheme, options?: WorldThemeOptions) => {
  // Implementation
};
```

### README Standards
```markdown
# Component Name

Brief description of the component's purpose and main functionality.

## Usage

```tsx
import { ComponentName } from '@/components/ui/component-name';

<ComponentName
  requiredProp="value"
  optionalProp="value"
  onEvent={handleEvent}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `requiredProp` | `string` | - | Required prop description |
| `optionalProp` | `string` | `'default'` | Optional prop description |

## Examples

### Basic Usage
[Example code]

### With World Theme
[Example code]

## Accessibility

- Component meets WCAG 2.1 AA standards
- Supports keyboard navigation
- Includes proper ARIA labels
```

## Quality Assurance Standards

### Pre-commit Checks
```bash
# lint-staged configuration
{
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write",
    "npm run type-check"
  ],
  "*.{css,scss}": [
    "prettier --write"
  ],
  "*.{md,json}": [
    "prettier --write"
  ]
}
```

### Code Review Checklist
- [ ] TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Component props properly typed
- [ ] Accessibility requirements met
- [ ] Performance implications considered
- [ ] Tests added for new functionality
- [ ] Documentation updated
- [ ] World theming support implemented
- [ ] Error boundaries considered
- [ ] Mobile responsiveness verified

---

*These coding standards ensure consistent, maintainable, and performant code that supports ZackBissell.com's immersive storytelling platform while maintaining accessibility and developer experience quality.*