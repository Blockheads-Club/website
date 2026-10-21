import { describe, expect, it } from 'vitest';
import { covers, latestFromApi, mergeHeaders, staticRoutes } from './patcher-build';

describe('latestFromApi', () => {
  it('picks the most recently published non-draft release, not the highest version', () => {
    expect(
      latestFromApi([
        { tag_name: 'v1.0.0-dev.2', draft: false, published_at: '2026-10-17T19:07:56Z' },
        { tag_name: 'v0.2.0', draft: true, published_at: null },
        { tag_name: 'v0.1.1', draft: false, published_at: '2026-10-21T09:25:38Z' },
        { tag_name: 'v0.1.0', draft: false, published_at: '2026-10-20T15:52:05Z' },
        { tag_name: 'v0.3.0', draft: false, published_at: null }
      ])
    ).toBe('v0.1.1');
  });

  it('returns undefined without published releases', () => {
    expect(latestFromApi([])).toBeUndefined();
    expect(latestFromApi([{ tag_name: 'v1', draft: true, published_at: '2026-01-01T00:00:00Z' }])).toBeUndefined();
  });
});

describe('staticRoutes', () => {
  it('keeps static page routes only', () => {
    expect(
      staticRoutes([
        '+page.svelte',
        '+layout.svelte',
        'splash/+page.svelte',
        'splash/helper.ts',
        'a\\b\\+page.svelte',
        'item/[id]/+page.svelte',
        '(group)/x/+page.svelte',
        'not+page.svelte'
      ])
    ).toEqual(['a/b', 'splash']);
  });
});

describe('covers', () => {
  it('matches splat and literal patterns', () => {
    expect(covers('/*', '/patcher/*')).toBe(true);
    expect(covers('/_app/immutable/*', '/patcher/_app/immutable/*')).toBe(false);
    expect(covers('/patcher/*', '/patcher/_app/*')).toBe(true);
    expect(covers('/x', '/x')).toBe(true);
    expect(covers('/x', '/x/*')).toBe(false);
  });
});

describe('mergeHeaders', () => {
  const site = `/*
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self'
  Referrer-Policy: strict-origin-when-cross-origin

/_app/immutable/*
  Cache-Control: public, max-age=31536000, immutable
`;
  const patcher = `# comment 'sha256-x'
  orphan: header before any rule is ignored
/*
  Content-Security-Policy: default-src 'self'; worker-src 'self' blob:
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin

/_app/immutable/*
  Cache-Control: public, max-age=31536000, immutable
`;

  it('prefixes the patcher rules and detaches overlapping site headers', () => {
    expect(mergeHeaders(site, patcher, '/patcher')).toBe(`${site.trimEnd()}

# Web Patcher (scripts/build-patcher.ts): its own headers, site headers detached.
/patcher/*
  ! x-frame-options
  ! content-security-policy
  Content-Security-Policy: default-src 'self'; worker-src 'self' blob:
  X-Frame-Options: DENY
  Cross-Origin-Opener-Policy: same-origin

/patcher/_app/immutable/*
  Cache-Control: public, max-age=31536000, immutable
`);
  });
});
