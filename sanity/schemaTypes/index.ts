/**
 * Sanity schema types — mirror `src/lib/types.ts`.
 *
 * All four documents are singletons with fixed IDs (see sanity/structure.ts).
 *
 * Bar Council of India, Rule 36: there are deliberately no fields for
 * testimonials, reviews, ratings, case results or counters. Do not add them.
 * Likewise no logo/emblem fields — the State Emblem of India may not be used
 * next to government appointments (e.g. the MCA mediator panel).
 */
import { disclaimer } from './disclaimer';
import { homePage } from './homePage';
import { privacyPage } from './privacyPage';
import { siteSettings } from './siteSettings';

export const schemaTypes = [siteSettings, homePage, disclaimer, privacyPage];
