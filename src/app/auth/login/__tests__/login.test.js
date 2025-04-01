/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../page';
import { useRouter } from 'next/navigation';

// Mock Carbon components
jest.mock('@carbon/react', () => ({
  Form: ({ children, onSubmit }) => <form onSubmit={onSubmit}>{children}</form>,
  Stack: ({ children }) => <div>{children}</div>,
  TextInput: ({ labelText, ...props }) => (
    <label>
      {labelText}
      <input {...props} />
    </label>
  ),
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  ToastNotification: ({ subtitle, kind }) => (
    <div data-testid={`toast-${kind}`}>{subtitle}</div>
  )
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...props }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
}));

// Mock styles
jest.mock('@/styles/Auth.module.scss', () => ({
  authContainer: 'authContainer',
  authForm: 'authForm',
  notification: 'notification',
  logoContainer: 'logoContainer',
  logoWrapper: 'logoWrapper',
  rightContent: 'rightContent',
  loginText: 'loginText',
  forgotPassword: 'forgotPassword',
  authSubmit: 'authSubmit',
  authLinks: 'authLinks'
}));

describe('Login Page', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    useRouter.mockImplementation(() => mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form elements', () => {
    render(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });

  it('handles successful form submission', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('successful')
      })
    );
    global.fetch = mockFetch;

    render(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  it('handles failed form submission', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    );
    global.fetch = mockFetch;

    render(<Login />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });

    // Additional error state check
    expect(screen.getByTestId('toast-error')).toBeInTheDocument();
  });
});
