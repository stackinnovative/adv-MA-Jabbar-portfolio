import type { SiteContent } from '@/lib/types';

/**
 * Local content. Used as-is when Sanity is not configured; once it is, this is
 * the fallback for any field left empty in the CMS, and the seed data for
 * `npm run seed`. After seeding, edit content in the Studio (/studio), not here.
 * Sources: client CV (Sept 2026) and client notes of 25/09/2026.
 * Placeholders to fill are in [square brackets] or marked TODO.
 *
 * Bar Council of India, Rule 36: facts only. No testimonials, results,
 * ratings, or self-praise ("best", "top", "leading", "expert", "extensive", ...).
 * No State Emblem of India / Ashoka emblem next to the MCA appointment.
 */
export const siteContent: SiteContent = {
  settings: {
    name: 'Adv. M.A. Jabbar',
    fullName: 'Adv. Abdul Jabbarudeen M.',
    role: 'Advocate · Mediator · Arbitrator · Social Activist',
    taglineMl: 'നീതി · സംവാദം · സമവായം',
    seo: {
      title: 'Adv. M.A. Jabbar — Advocate, Mediator & Arbitrator | High Court of Kerala',
      description:
        'Adv. M.A. Jabbar (Abdul Jabbarudeen M.) — advocate at the High Court of Kerala, IMI and IICA certified mediator, corporate mediator with the Ministry of Corporate Affairs - Govt Of India, and empanelled arbitrator with NSE and BSE. Chambers at Ernakulam and Punalur.',
      ogDescription:
        'Advocate, High Court of Kerala. Certified mediator (IMI, IICA) and empanelled arbitrator (NSE, BSE). Chambers at Ernakulam and Punalur.',
      ogImage: '/images/og.jpg',
    },
    phones: [
      { href: 'tel:+919447009556', display: '+91 94470 09556' },
      { href: 'tel:+917907694622', display: '+91 79076 94622' },
    ],
    // Public emails, in display order (first = main): top bar, Contact, footer, structured data.
    emails: ['vu3jbr@gmail.com', 'majabbaradv@gmail.com'],
    // Where enquiry-form messages go. Not shown on the site.
    enquiryEmail: 'vu3jbr@gmail.com',
    // TODO: confirm chamber hours (same for both offices?)
    hours: 'Mon – Sat, 10:00 am – 6:00 pm',
    hoursNote: 'Mediation sessions by prior appointment',
    offices: [
      {
        label: 'Ernakulam — High Court',
        lines: ['Adv. M.A. Jabbar', 'No. 253, KHCAA Chamber Complex', 'Near High Court, Ernakulam', 'Kerala – 682031'],
        footerLines: ['No. 253, KHCAA Chamber Complex', 'Near High Court, Ernakulam'],
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=KHCAA+Chamber+Complex+High+Court+Ernakulam+682031',
      },
      {
        label: 'Punalur, Kollam',
        lines: ['Adv. M.A. Jabbar · Law Relief', 'Room No. 9, GKP Tower, Near Court Complex', 'Chemmanthoor, Punalur, Kollam', 'Kerala – 691305'],
        footerLines: ['Room No. 9, GKP Tower, Near Court Complex', 'Chemmanthoor, Punalur, Kollam'],
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=GKP+Tower+Chemmanthoor+Punalur+691305',
      },
    ],
    // TODO: Bar Council of Kerala enrolment number
    enrolmentNo: 'K/[XXXX]/[YEAR]',
    // Ernakulam chamber. TODO: replace with the exact pin's embed link from Google Maps → Share → Embed.
    mapEmbedUrl: 'https://www.google.com/maps?q=KHCAA+Chamber+Complex,+High+Court,+Ernakulam,+Kerala+682031&output=embed',
    // TODO: Formspree / Web3Forms / own API endpoint
    formEndpoint: '',
  },

  home: {
    hero: {
      kicker: 'Kerala · Mediation · Arbitration',
      heading: 'Turning conflict\ninto *cooperation*,\nthrough dialogue.',
      lead: 'Advocate at the High Court of Kerala. IMI and Indian Institute of corporate Affairs(IICA) certified mediator, Corporate mediator with the Ministry of Corporate Affairs(Govt Of India), and empanelled arbitrator with NSE and BSE.',
      image: {
        src: '/images/hero-portrait-seated-side-f041633c.jpg',
        alt: 'Adv. M.A. Jabbar, seated, in a dark suit',
        width: 1400,
        height: 1800,
      },
      badge: { label: 'Chambers', value: 'Ernakulam & Punalur' },
      // Kinds of work only — credentials live in the lead above and in the Panels list
      // (keep every fact to at most two mentions on the page).
      highlights: [
        { title: 'Mediation', text: 'Helping the parties talk a dispute through and reach terms they both accept.' },
        { title: 'Arbitration', text: 'Hearing both sides on the evidence and deciding the dispute in a written award.' },
        { title: 'Litigation', text: 'Representing clients in court, from the first pleading to the final hearing.' },
        { title: 'Advisory', text: 'Advice on how a dispute can be resolved — by negotiation, mediation, arbitration or in court.' },
      ],
    },

    about: {
      name: 'Abdul Jabbarudeen M.',
      subtitle: 'Advocate · Mediator · Arbitrator · Social Activist',
      // Personal narrative only. Credentials are in the hero lead and the Panels list,
      // and the work itself is in the role tabs below.
      bio: [
        'Adv. Abdul Jabbarudeen M. is an advocate, mediator and arbitrator in Kerala, and a social activist. He is a certified commercial mediator of the Indian Institute of Corporate Affairs (IICA). His approach to mediation rests on empathy, dialogue and understanding — helping parties move from conflict to cooperation.',
        'He holds an LL.M. and an LL.B. from Mahatma Gandhi University, Kottayam, and a Post Graduate Diploma in Alternative Dispute Resolution(PGADR) from NALSAR University of Law, Hyderabad. He also holds a B.Sc. in Zoology from the University of Kerala and a Post Graduate Diploma in Journalism (PGDJ) from the School of Communication and Management Studies (SCMS), Cochin.',
      ],
      portrait: {
        src: '/images/about-portrait-headshot-left-607a508f.jpg',
        alt: 'Portrait of Adv. Abdul Jabbarudeen M.',
        width: 1200,
        height: 986,
      },
      roles: {
        eyebrow: 'Roles in Detail',
        heading: 'One practice,\n*four roles*',
        items: [
          // Each tab describes the work. Credentials (court, panels, certifications) are
          // stated in the hero lead and the Panels list — not repeated here.
          {
            title: 'Advocate',
            subtitle: 'Litigation & advice',
            summary: 'Civil, criminal and constitutional matters, with chambers at Ernakulam and Punalur.',
            points: [
              'Pleadings, petitions, affidavits, applications and legal submissions',
              'Legal research on legislation, case law, evidence and procedure',
              'Review of agreements, case records and documentary evidence',
              'Advice on litigation, regulatory compliance and dispute-resolution options',
            ],
            facts: [
              { label: 'Practising since', value: '2018' },
              { label: 'Memberships', value: 'KHCAA (life member) · Punalur Bar Association' },
            ],
          },
          {
            title: 'Mediator',
            subtitle: 'Corporate, commercial & international',
            summary: 'Structured, confidential mediation that helps parties settle corporate, commercial and contractual disputes.',
            points: [
              'Joint and private sessions with each party',
              'Identifying the real issues behind each side’s position',
              'Negotiation and settlement-oriented discussion',
              'Multi-party disputes and matters under the Companies Act, 2013',
              'Online sessions for parties in different places',
            ],
            facts: [
              { label: 'Approach', value: 'Empathy · Dialogue · Understanding' },
              { label: 'Languages', value: 'Malayalam · English · Hindi' },
            ],
          },
          {
            title: 'Arbitrator',
            subtitle: 'Securities & commercial',
            summary: 'Arbitration of disputes between investors, trading members and businesses, under the applicable exchange rules and procedures.',
            points: [
              'Review of trading records, contracts, documentary evidence and party submissions',
              'Hearings on claims and counterclaims',
              'Reasoned arbitral awards under the Arbitration and Conciliation Act, 1996',
            ],
            facts: [
              { label: 'Empanelled since', value: 'February 2017' },
              { label: 'Disputes', value: 'Commercial · Financial · Securities' },
            ],
          },
          {
            title: 'Social Activist',
            subtitle: 'Development, rights & education',
            summary: 'Work on sustainable development, human rights and education, in Kerala and beyond.',
            points: [
              'UN Sustainable Development Goals campaigner; delegate to the UN Global Meeting on Sustainable Development, Bonn, 2019',
              'Human rights activist; International Member, Amnesty International',
              // TODO: confirm trust name spelling ("Al Aman" in client notes)
              'Founder & Secretary — Al Aman Educational and Charitable Trust and Al Ameen Public School (CBSE), Pathanapuram',
              'Former National Vice President — National Lawyers Campaign for Judicial Transparency and Reforms',
              'Member — United Nations Millennium Campaign',
            ],
            facts: [],
          },
        ],
      },
    },

    quote: {
      text: 'As India continues to build its physical infrastructure, it must also strengthen its culture of communication and collaboration — making mediation an essential pillar for peace, progress and sustainable development.',
      attribution: 'Adv. M.A. Jabbar',
      image: {
        src: '/images/quote-portrait-hands-on-hips-2f24cac2.jpg',
        alt: 'Adv. M.A. Jabbar, smiling, hands on hips',
        width: 1000,
        height: 1037,
      },
    },

    practice: {
      eyebrow: 'Areas of Practice',
      heading: 'Dispute resolution,\nin and out of court',
      intro: 'The list below is for information only. Please contact the chambers to discuss whether a specific matter can be taken up.',
      areas: [
        { title: 'High Court Litigation', description: 'Civil, criminal and constitutional matters.' },
        { title: 'Corporate & Commercial Mediation', description: 'Corporate, contractual and business disputes, including matters under the Companies Act, 2013.' },
        { title: 'International Mediation', description: 'Structured, confidential mediation between parties in different places, including online sessions.' },
        { title: 'Securities Arbitration', description: 'Investor and trading-member disputes in the securities market.' },
        { title: 'Commercial Arbitration', description: 'Ad hoc and institutional arbitration under the Arbitration and Conciliation Act, 1996.' },
        { title: 'Pre-Institution Mediation', description: 'Mediation required before filing a commercial suit, under Section 12A of the Commercial Courts Act.' },
        { title: 'Legal Drafting & Opinions', description: 'Pleadings, petitions, affidavits, legal submissions and legal opinions.' },
        { title: 'Contract Review & Compliance', description: 'Review of agreements and regulatory requirements to identify legal issues and risks.' },
      ],
    },

    practiceQuote: {
      text: 'Behind every dispute are people, perspectives, and interests. Mediation brings them together in dialogue, creating space for understanding and a path towards resolution.',
      attribution: 'Adv. M.A. Jabbar',
      image: {
        src: '/images/quote2-portrait-headshot-front-104fbce5.jpg',
        alt: 'Head-and-shoulders portrait of Adv. M.A. Jabbar',
        width: 1000,
        height: 787,
      },
    },

    panels: {
      eyebrow: 'Panels, Certifications & Forums',
      // The single list of credentials (with the hero lead, the only places they appear).
      items: [
        'Advocate — High Court of Kerala',
        'Life Member — Kerala High Court Advocates’ Association (KHCAA), Ernakulam',
        'Member — Punalur Bar Association, Punalur, Kollam',
        'Arbitrator Panel — NSE & BSE, Cochin, since 2017',
        'Corporate Mediator — Ministry of Corporate Affairs: Cochin, Chennai, Bangalore, Hyderabad',
        'Certified International Mediator — IMI, through ODR Latinoamérica, 2025',
        'Commercial Mediator — Indian Institute of corporate Affairs(IICA)',
        'Panel Mediator — Track Second, Noida',
        // TODO: confirm exact title with client (CV: "Mediator – Nivaaran, Supreme Court of India Mediation Centre")
        'Mediator — Nivaaran',
      ],
    },

    process: {
      eyebrow: 'How Mediation Works',
      heading: 'From dispute to settlement',
      steps: [
        { title: 'First meeting', text: 'Understanding the dispute and checking whether it is suited to mediation or arbitration.' },
        { title: 'Joint & private sessions', text: 'Each side is heard, together and separately, in confidence.' },
        { title: 'Finding common ground', text: 'Options are explored openly until terms both parties can accept emerge.' },
        { title: 'Settlement agreement', text: 'The agreed terms are written down and signed, so they can be enforced.' },
      ],
    },

    beyond: {
      eyebrow: 'Beyond the Courtroom',
      heading: 'Public service',
      // Public-service record only; his activism is listed in the Social Activist role tab.
      body: 'Before and alongside his legal work, Adv. M.A. Jabbar has served in public health, disaster management and civic programmes. For nearly three decades he coordinated district eye-care programmes for the Government of Kerala.',
      image: {
        src: '/images/bw-portrait-seated-ba7f1e8f.jpg',
        alt: 'Black-and-white portrait of Adv. M.A. Jabbar',
        width: 1200,
        height: 1534,
      },
      timeline: [
        'District Ophthalmic Co-ordinator — Government of Kerala, National Programme for Control of Blindness',
        'Coordinator — State Disaster Management wireless communications, Sabarimala',
        'Representative of Amnesty International India — People’s Budget Programme, New Delhi',
        'Former Regional Project Manager & Additional Cabinet Secretary — Lions Clubs International, District 324E-1',
      ],
    },

    contact: {
      eyebrow: 'Contact',
      heading: 'Visit the chambers',
      note: 'By prior appointment only',
      formHeading: 'Send an enquiry',
      matterOptions: [
        'High Court matter (civil / criminal / constitutional)',
        'Corporate or commercial mediation',
        'Securities arbitration',
        'Commercial arbitration',
        'Legal drafting or opinion',
        'Other',
      ],
      consentText: 'I understand that sending this form does not create an advocate–client relationship.',
    },
  },

  disclaimer: {
    intro: 'The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I agree”, you confirm that:',
    points: [
      'You are visiting this website on your own, to learn more about Adv. M.A. Jabbar (Abdul Jabbarudeen M.), and there has been no advertisement, invitation or inducement of any kind.',
      'The information here is general and is not legal advice. Using this website does not create an advocate–client relationship.',
      'The chambers are not responsible for any action taken based on the content of this website.',
    ],
    footerText:
      'This website is for informational purposes only as per BCI rules. No advertisement or solicitation. Emblems/logos of Government of India are not used.',
  },

  // TODO: final wording reviewed by the advocate (DPDP Act, 2023 — the form collects personal data)
  privacy: {
    title: 'Privacy Policy',
    paragraphs: [
      'This website is maintained by Adv. M.A. Jabbar (Abdul Jabbarudeen M.), No. 253, KHCAA Chamber Complex, Near High Court, Ernakulam, Kerala – 682031.',
      'When you send an enquiry through the form on this website, the chambers receive your name, phone number, email address (if given), the type of matter and your message.',
      'This information is used only to respond to your enquiry. It is not sold, and it is not shared with anyone other than the service that delivers form messages to the chambers.',
      'Enquiries are kept only as long as needed to respond and to meet professional obligations. To ask for your information to be corrected or deleted, write to vu3jbr@gmail.com or majabbaradv@gmail.com.',
      'This website does not use advertising or tracking cookies. It stores one setting in your browser to remember that you have read the disclaimer.',
    ],
  },
};
