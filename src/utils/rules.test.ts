import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, calculateReadingTime, slugify, matchesKeyword } from './rules.ts';

test('validateContactForm rejects empty submissions', () => {
  const result = validateContactForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.businessName);
  assert.ok(result.errors.selectedServices);
});

test('validateContactForm passes with valid payload', () => {
  const result = validateContactForm({
    fullName: 'Damian Romero',
    email: 'damian@auvrynstudios.com',
    phone: '407-555-0199',
    businessName: 'Apex Architecture',
    selectedServices: ['cinematic-website-design'],
    budgetRange: '$10,000 - $25,000',
    projectDetails: 'We need an immersive 3D showcase for our luxury architecture firm.',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('calculateReadingTime calculates correct minutes', () => {
  const shortText = 'Hello world, this is a test.';
  assert.equal(calculateReadingTime(shortText), '1 min read');

  const longText = new Array(450).fill('word').join(' ');
  assert.equal(calculateReadingTime(longText), '3 min read');
});

test('slugify cleans punctuation and formats kebab-case', () => {
  assert.equal(slugify('3D & Immersive Web Experiences!'), '3d-immersive-web-experiences');
  assert.equal(slugify('Orlando Local SEO & Search Visibility'), 'orlando-local-seo-search-visibility');
});

test('matchesKeyword verifies keywords and text', () => {
  assert.equal(matchesKeyword('orlando', 'Auvryn Studios Orlando FL', ['cinematic web design']), true);
  assert.equal(matchesKeyword('cinematic', 'Auvryn Studios', ['cinematic web design']), true);
  assert.equal(matchesKeyword('xyznonexistent', 'Auvryn Studios', ['seo']), false);
});
