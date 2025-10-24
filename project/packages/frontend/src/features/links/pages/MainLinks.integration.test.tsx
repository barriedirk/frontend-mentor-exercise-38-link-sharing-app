import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import MainLinks from './MainLinks';

// 🧩 Mocks
import * as mainLinksSignal from './MainLinksStateSignal';
import * as profileStore from '@src/store/useProfileStore';
import * as loadingSignal from '@src/services/loadingSignal';
import * as profileApi from '@src/services/profileApi';
import { tabHeader } from './MainLinksStateSignal';

// Mock router navigation
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock external services
vi.mock('@src/services/profileApi', () => ({
  updateProfile: vi.fn().mockResolvedValue({}),
}));

vi.mock('@src/services/loadingSignal', () => ({
  loadingSignal: {
    show: vi.fn(),
    hide: vi.fn(),
  },
}));

// Mock Icon component (visual only)
vi.mock('@src/components/icon/Icon', () => ({
  default: ({ name }: { name: string }) => (
    <span data-testid={`icon-${name}`} />
  ),
}));

// Mock Profile Store
const mockProfile = {
  profile: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    slug: 'john-doe',
    password: '',
  },
  avatar: null,
  updateAvatar: vi.fn(),
  updateProfile: vi.fn((updatedProfile) => {
    mockProfile.profile = { ...mockProfile.profile, ...updatedProfile };

    // console.log('mockProfile => ', mockProfile.profile);

    return Promise.resolve();
  }),
};

vi.mock('@src/store/useProfileStore', () => ({
  useProfileStore: (selector: any) => selector(mockProfile),
}));

// Mock Link Store
const mockLinkState = {
  links: [
    { id: 1, platform: 'Twitter', url: 'https://twitter.com/john' },
    { id: 2, platform: 'GitHub', url: 'https://github.com/john' },
  ],
  isLinksValid: true,
  addNewLink: vi.fn(),
  update: vi.fn(),
  updateLink: vi.fn(),
  switchPosition: vi.fn(),
  updateIsLinksValid: vi.fn(),
  removeLink: vi.fn(),
  clearLinks: vi.fn(),
  reset: vi.fn(),
};

vi.mock('@src/store/useLinksStore', () => ({
  useLinksStore: (selector: any) => {
    const selected = selector(mockLinkState);

    // console.log('[useLinkStore mock called]');
    // console.log('Selected value:', selected);
    // console.log('Full mock state:', mockLinkState);

    return selected;

    // console.log('[MOCK STORE CALLED] selector:', selector.toString());
    // console.log('[MOCK STATE]', mockLinkState);

    // return selector(mockLinkState);
  },
}));

// Avoid matchMedia errors (toast uses it)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {
      /* empty */
    },
    removeListener: () => {
      /* empty */
    },
    addEventListener: () => {
      /* empty */
    },
    removeEventListener: () => {
      /* empty */
    },
    dispatchEvent: () => false,
  }),
});

async function waitForText(text: RegExp) {
  await waitFor(() => expect(screen.getByText(text)).toBeInTheDocument());
}

describe('MainLinks Integration', () => {
  beforeAll(() => {
    // ERROR: TypeError: URL.createObjectURL is not a function
    // error comes from URL.createObjectURL not existing in the test environment.
    // but jsdom (used by Testing Library / Vitest) doesn’t implement URL.createObjectURL by default.
    Object.defineProperty(globalThis.URL, 'createObjectURL', {
      writable: true,
      value: vi.fn(() => 'mock-url'),
    });

    Object.defineProperty(globalThis.URL, 'revokeObjectURL', {
      writable: true,
      value: vi.fn(),
    });
  });

  beforeEach(() => {
    // restores only Vitest spies/mocks, safe if you haven't re-mocked URL.createObjectURL
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // reset call counts for mocks
    vi.resetAllMocks();
  });

  const renderMainLinks = () =>
    render(
      <MemoryRouter>
        <MainLinks />
      </MemoryRouter>
    );

  it('renders Profile tab by default', async () => {
    renderMainLinks();

    // Wait for Profile tab to be set in useEffect
    await waitFor(() => {
      const headings = screen
        .getAllByText(/profile details/i)
        .filter((el) => el.tagName.toLowerCase() === 'h2');

      expect(headings).toHaveLength(1);
      expect(headings[0]).toBeInTheDocument();
    });

    expect(screen.getByText(/add your details/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('updates signal when switching tabs', async () => {
    const user = userEvent.setup();

    renderMainLinks();

    // Default tab should be "profile"
    expect(tabHeader.value).toBe('profile');

    // Click Links tab
    const linksButton = await screen.findByTestId('tab-show-links-form');
    await user.click(linksButton);

    // Signal should update
    expect(tabHeader.value).toBe('link');

    // Click Profile tab
    const profileButton = await screen.findByTestId('tab-show-profile-form');
    await user.click(profileButton);

    // Signal should update back
    expect(tabHeader.value).toBe('profile');
  });

  it('updates signal when switching tabs - using setSignal', async () => {
    const user = userEvent.setup();

    // Spy on the 'value' setter
    const setSignal = vi.spyOn(tabHeader, 'value', 'set');

    renderMainLinks();

    // Switch to Links tab
    const linksButton = await screen.findByTestId('tab-show-links-form');
    await user.click(linksButton);

    expect(setSignal).toHaveBeenCalledWith('link');

    // Switch to Profile tab
    const profileButton = await screen.findByTestId('tab-show-profile-form');
    await user.click(profileButton);
    expect(setSignal).toHaveBeenCalledWith('profile');
  });

  it('switches to Links tab when clicking the Links button', async () => {
    const user = userEvent.setup();
    renderMainLinks();

    const linksButton = await screen.findByTestId('tab-show-links-form');
    expect(linksButton).toBeInTheDocument();

    await user.click(linksButton);

    await waitFor(() => {
      expect(screen.getByText(/customize your links/i)).toBeInTheDocument();
    });
  });

  it('returns to Profile tab when clicking the Profile button', async () => {
    const user = userEvent.setup();
    renderMainLinks();

    const linksButton = await screen.findByTestId('tab-show-links-form');
    const profileButton = await screen.findByTestId('tab-show-profile-form');

    await user.click(linksButton);

    await waitFor(() => {
      expect(screen.getByText(/customize your links/i)).toBeInTheDocument();
    });

    await user.click(profileButton);

    await waitFor(() => {
      // MainLinks Integration > returns to Profile tab when clicking the Profile button
      // expect(screen.getByText(/profile details/i)).toBeInTheDocument();

      const headings = screen
        .getAllByText(/profile details/i)
        .filter((el) => el.tagName.toLowerCase() === 'h2');

      expect(headings).toHaveLength(1);
      expect(headings[0]).toBeInTheDocument();
    });
  });

  it('renders existing links and allows adding/removing links', async () => {
    const user = userEvent.setup();

    renderMainLinks();

    // Switch to Links tab
    const linksButton = await screen.findByTestId('tab-show-links-form');

    await user.click(linksButton);

    // Wait for Links tab content
    await waitFor(() => {
      expect(screen.getByText(/customize your links/i)).toBeInTheDocument();
    });

    // Check existing links
    expect(
      screen.getByDisplayValue('https://twitter.com/john')
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue('https://github.com/john')
    ).toBeInTheDocument();

    // // Simulate adding a new link
    const addButton = screen.getByTestId('button-add-new-link');

    await user.click(addButton);
    expect(mockLinkState.addNewLink).toHaveBeenCalled();

    // Simulate removing a link
    const removeButtons = screen.getAllByTestId(
      /^button-platform-remove-link-/
    );
    expect(removeButtons).toHaveLength(2);

    await user.click(removeButtons[0]);
    expect(mockLinkState.removeLink).toHaveBeenCalledWith(0);
  });

  it('updates profile and avatar', async () => {
    const user = userEvent.setup();
    renderMainLinks();

    // Wait for Profile tab
    await waitFor(() => {
      // expect(screen.getByText(/profile details/i)).toBeInTheDocument();
      const headings = screen
        .getAllByText(/profile details/i)
        .filter((el) => el.tagName.toLowerCase() === 'h2');

      expect(headings).toHaveLength(1);
      expect(headings[0]).toBeInTheDocument();
    });

    // console.log('body => ', document.body.innerHTML);

    // Change first name input
    const firstNameInput = screen.getByTestId('profile-first-name');

    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');

    // // Trigger save
    const saveButton = screen.getByTestId('submit-save-profile');
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockProfile.updateProfile).toHaveBeenCalled();
    });

    // wait for async update
    await waitFor(() => {
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    });

    // console.log(mockProfile.profile);

    expect(mockProfile.profile.firstName).toBe('Jane');
    expect(mockProfile.profile.lastName).toBe('Doe');
    expect(mockProfile.profile.email).toBe('john@example.com');
  });

  it('renders empty links state', async () => {
    const user = userEvent.setup();

    mockLinkState.links = [];

    renderMainLinks();

    const linksButton = await screen.findByTestId('tab-show-links-form');
    await user.click(linksButton);

    // console.log('Render Links state => ', document.body.innerHTML);

    expect(
      screen.getByText(/Use the “Add new link” button to get started/i)
    ).toBeInTheDocument();
  });

  it('updates avatar when a new file is uploaded', async () => {
    const user = userEvent.setup();

    renderMainLinks();

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    // console.log('Update Avatar state => ', document.body.innerHTML);

    const input = screen.getByTestId('picture') as HTMLInputElement;

    await user.upload(input, file);

    expect(mockProfile.updateAvatar).toHaveBeenCalledWith(file);
  });
});
