import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../page';

// Mock Carbon components
jest.mock('@carbon/react', () => ({
  Grid: ({ children }) => <div data-testid="grid">{children}</div>,
  Column: ({ children }) => <div data-testid="column">{children}</div>,
  Header: ({ children }) => <header data-testid="header">{children}</header>,
  HeaderName: ({ children }) => <div data-testid="header-name">{children}</div>,
  HeaderGlobalBar: ({ children }) => <div data-testid="header-global">{children}</div>,
  HeaderGlobalAction: ({ children }) => <button data-testid="header-action">{children}</button>,
  SideNav: ({ children }) => <nav data-testid="sidenav">{children}</nav>,
  SideNavItems: ({ children }) => <ul data-testid="sidenav-items">{children}</ul>,
  SideNavLink: ({ children }) => <li data-testid="sidenav-link">{children}</li>
}));

// Mock Carbon icons
jest.mock('@carbon/icons-react', () => ({
  Search: () => <div data-testid="search-icon">Search</div>,
  Notification: () => <div data-testid="notification-icon">Notification</div>,
  UserAvatar: () => <div data-testid="user-icon">User</div>,
  Dashboard: () => <div data-testid="dashboard-icon">Dashboard</div>,
  Document: () => <div data-testid="document-icon">Document</div>,
  Settings: () => <div data-testid="settings-icon">Settings</div>
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />
}));

// Mock styles
jest.mock('@/styles/Dashboard.module.scss', () => ({
  dashboardContainer: 'dashboardContainer',
  // Add other class names used in your Dashboard component
}));

describe('Dashboard Page', () => {
  it('renders dashboard components', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidenav')).toBeInTheDocument();
  });

  it('displays header elements', () => {
    render(<Dashboard />);
    expect(screen.getByText('IBM InfoSphere')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    expect(screen.getByTestId('user-icon')).toBeInTheDocument();
  });

  it('displays user information when available', () => {
    // Mock user data if your dashboard displays user info
    const mockUser = { name: 'Test User' };
    render(<Dashboard user={mockUser} />);
    
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
  });

  // Add more tests based on your dashboard functionality
});
