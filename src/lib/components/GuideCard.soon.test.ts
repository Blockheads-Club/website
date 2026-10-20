import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import GuideCard from './GuideCard.svelte';

// A guide that is listed but not written yet shows an inert card with a "Coming soon" badge.
vi.mock('$lib/guides', async (importOriginal) => {
  const real = await importOriginal<typeof import('$lib/guides')>();
  return {
    ...real,
    guideById: (id: string) => ({ ...real.guideById(id), path: undefined })
  };
});

describe('GuideCard for an unwritten guide', () => {
  it.each(['home', 'list', 'featured'] as const)('%s variant is inert and coming soon', (variant) => {
    render(GuideCard, { id: 'docker', variant });
    expect(screen.queryByRole('link')).toBeNull();
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });
});
