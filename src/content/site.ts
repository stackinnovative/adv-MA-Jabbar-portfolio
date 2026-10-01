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
        'Adv. M.A. Jabbar (Abdul Jabbarudeen M.) — advocate at the High Court of Kerala, IMI and IICA certified mediator, corporate mediator with the Ministry of Corporate Affairs, and empanelled arbitrator with NSE and BSE. Chambers at Ernakulam and Punalur.',
      ogDescription:
        'Advocate, High Court of Kerala. Certified mediator (IMI, IICA) and empanelled arbitrator (NSE, BSE). Chambers at Ernakulam and Punalur.',
      ogImage: '/images/og.jpg',
    },
    phone: { href: 'tel:+919447009556', display: '+91 94470 09556' },
    email: 'vu3jbr@gmail.com',
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
      kicker: 'High Court of Kerala · Mediation · Arbitration',
      heading: 'Turning conflict\ninto *cooperation*,\nthrough dialogue.',
      lead: 'Advocate at the High Court of Kerala. IMI and IICA certified mediator, corporate mediator with the Ministry of Corporate Affairs, and empanelled arbitrator with NSE and BSE.',
      image: {
        src: '/images/hero-portrait-seated-side-f041633c.jpg',
        alt: 'Adv. M.A. Jabbar',
        width: 1400,
        height: 1800,
      },
      badge: { label: 'Certified Mediator', value: 'IMI · IICA' },
      highlights: [
        { title: 'Advocate', text: 'Practising before the High Court of Kerala. Life member, Kerala High Court Advocates’ Association (KHCAA).' },
        { title: 'International Mediator', text: 'Certified through ODR Latinoamérica / IMI, Netherlands, and trained as a commercial mediator by IICA.' },
        { title: 'Corporate Mediator', text: 'Ministry of Corporate Affairs, Government of India — Cochin, Chennai, Bangalore and Hyderabad regions.' },
        { title: 'Arbitrator', text: 'Empanelled arbitrator with the National Stock Exchange (NSE) and BSE, Cochin region, since 2017.' },
        { title: 'Social Activist', text: 'UN SDG campaigner, human rights activist, and founder of Al Ameen Public School, Pathanapuram.' },
      ],
    },

    about: {
      name: 'Abdul Jabbarudeen M.',
      subtitle: 'Advocate, High Court of Kerala · Mediator · Arbitrator · Social Activist',
      bio: [
        'Adv. Abdul Jabbarudeen M. (Adv. M.A. Jabbar) practises before the High Court of Kerala in civil, criminal and constitutional matters. He is a life member of the Kerala High Court Advocates’ Association (KHCAA).',
        'Since 2017 he has been an empanelled arbitrator with the National Stock Exchange (NSE) and BSE for the Cochin region, hearing commercial, financial and securities-related disputes under the Arbitration and Conciliation Act, 1996.',
        'He is a Certified International Mediator through ODR Latinoamérica / International Mediation Institute (IMI), Netherlands, and a professional commercial mediator trained by the Indian Institute of Corporate Affairs (IICA). He is empanelled as a corporate and commercial mediator with the Ministry of Corporate Affairs, Government of India, for the Cochin, Chennai, Bangalore and Hyderabad regions, and is a panel mediator with Track Second, Noida.',
        'He holds an LL.M. and an LL.B. from Mahatma Gandhi University, Kottayam, and a Post Graduate Diploma in Alternative Dispute Resolution from NALSAR University of Law, Hyderabad. His approach to mediation rests on empathy, dialogue and understanding.',
      ],
      portrait: {
        src: '/images/about-portrait-headshot-left-607a508f.jpg',
        alt: 'Portrait of Adv. Abdul Jabbarudeen M.',
        width: 1200,
        height: 986,
      },
      facts: [
        { label: 'Practice', value: 'High Court of Kerala' },
        { label: 'Certified Mediator', value: 'IMI · IICA' },
        { label: 'Corporate Mediator', value: 'Ministry of Corporate Affairs' },
        { label: 'Empanelled Arbitrator', value: 'NSE · BSE, since 2017' },
        { label: 'Education', value: 'LL.M. · PGDADR, NALSAR' },
        { label: 'Languages', value: 'Malayalam · English · Hindi' },
      ],
      roles: {
        eyebrow: 'Roles in Detail',
        heading: 'One practice,\n*four roles*',
        items: [
          {
            title: 'Advocate',
            subtitle: 'High Court of Kerala',
            summary:
              'Practises before the High Court of Kerala in civil, criminal and constitutional matters, with chambers at Ernakulam and Punalur.',
            points: [
              'Civil, criminal and constitutional matters before the High Court of Kerala',
              'Pleadings, petitions, affidavits, applications and legal submissions',
              'Legal research on legislation, case law, evidence and procedure',
              'Review of agreements, case records and documentary evidence',
              'Advice on litigation, regulatory compliance and dispute-resolution options',
            ],
            facts: [
              { label: 'Court', value: 'High Court of Kerala' },
              { label: 'Practising since', value: '2018' },
              { label: 'Membership', value: 'Life Member, KHCAA' },
              { label: 'Chambers', value: 'Ernakulam · Punalur' },
            ],
          },
          {
            title: 'Mediator',
            subtitle: 'International & corporate',
            summary:
              'Certified International Mediator (IMI) and professional commercial mediator (IICA), empanelled for corporate and commercial mediation with the Ministry of Corporate Affairs, Government of India.',
            points: [
              'Corporate & commercial mediator, Ministry of Corporate Affairs — Cochin, Chennai, Bangalore and Hyderabad regions',
              'Certified International Mediator — ODR Latinoamérica / International Mediation Institute (IMI), Netherlands, 2025',
              'Professional Commercial Mediator — Indian Institute of Corporate Affairs (IICA), New Delhi',
              'Panel Mediator — Track Second ADR platform, Noida',
              'Corporate, contractual and multi-party disputes, including matters under the Companies Act, 2013',
            ],
            facts: [
              { label: 'Certified', value: 'IMI · IICA' },
              { label: 'Panel', value: 'Ministry of Corporate Affairs' },
              { label: 'Regions', value: 'Cochin · Chennai · Bangalore · Hyderabad' },
              { label: 'Qualification', value: 'PGDADR, NALSAR' },
            ],
          },
          {
            title: 'Arbitrator',
            subtitle: 'NSE & BSE, Cochin region',
            summary:
              'Empanelled arbitrator with the National Stock Exchange of India (NSE) and BSE for the Cochin region since February 2017.',
            points: [
              'Commercial, financial and securities-related disputes under NSE and BSE rules and procedures',
              'Review of trading records, contracts, documentary evidence and party submissions',
              'Arbitration hearings on claims and counterclaims',
              'Reasoned arbitral awards under the Arbitration and Conciliation Act, 1996',
            ],
            facts: [
              { label: 'Panels', value: 'NSE · BSE' },
              { label: 'Region', value: 'Cochin' },
              { label: 'Since', value: 'February 2017' },
              { label: 'Law', value: 'Arbitration and Conciliation Act, 1996' },
            ],
          },
          {
            title: 'Social Activist',
            subtitle: 'Development, rights & education',
            summary:
              'Alongside legal practice, works on sustainable development, human rights and education in Kerala and beyond.',
            points: [
              'UN Sustainable Development Goals campaigner; delegate to the UN Global Meeting on Sustainable Development, Bonn, 2019',
              'Human rights activist; International Member, Amnesty International',
              // TODO: confirm trust name spelling ("Al Aman" in client notes)
              'Founder & Secretary — Al Aman Educational and Charitable Trust and Al Ameen Public School (CBSE), Pathanapuram',
              'Former National Vice President — National Lawyers Campaign for Judicial Transparency and Reforms',
              'Member — United Nations Millennium Campaign',
            ],
            facts: [
              { label: 'Focus', value: 'Development · Human rights · Education' },
              { label: 'School', value: 'Al Ameen Public School, Pathanapuram' },
              { label: 'UN engagement', value: 'SDG campaigner · Bonn 2019' },
            ],
          },
        ],
      },
    },

    quote: {
      text: 'As India continues to build its physical infrastructure, it must also strengthen its culture of communication and collaboration — making mediation an essential pillar for peace, progress and sustainable development.',
      attribution: 'Adv. M.A. Jabbar',
      image: {
        src: '/images/quote-portrait-hands-on-hips-2f24cac2.jpg',
        alt: 'Adv. M.A. Jabbar',
        width: 1000,
        height: 1037,
      },
    },

    practice: {
      eyebrow: 'Areas of Practice',
      heading: 'Dispute resolution,\nin and out of court',
      intro: 'The list below is for information only. Please contact the chambers to discuss whether a specific matter can be taken up.',
      areas: [
        { title: 'High Court Litigation', description: 'Civil, criminal and constitutional matters before the High Court of Kerala.' },
        { title: 'Corporate & Commercial Mediation', description: 'Corporate, contractual and business disputes, including matters under the Companies Act, 2013.' },
        { title: 'International Mediation', description: 'Structured, confidential mediation between parties in different places, including online sessions.' },
        { title: 'Securities Arbitration', description: 'Investor and trading-member disputes under the NSE and BSE arbitration mechanism.' },
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
        alt: 'Adv. M.A. Jabbar',
        width: 1000,
        height: 787,
      },
    },

    panels: {
      eyebrow: 'Panels, Certifications & Forums',
      items: [
        'Advocate — High Court of Kerala',
        'Life Member — KHCAA',
        'Arbitrator Panel — NSE, Cochin',
        'Arbitrator Panel — BSE, Cochin',
        'Corporate Mediator — Ministry of Corporate Affairs',
        'Certified International Mediator — IMI',
        'Commercial Mediator — IICA',
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
      heading: 'Public service &\nsocial engagement',
      body: 'Alongside his legal work, Adv. M.A. Jabbar is a UN Sustainable Development Goals campaigner and human rights activist, and founded a school in Pathanapuram. From 1989 to 2018 he served the Government of Kerala as District Ophthalmic Co-ordinator under the National Programme for Control of Blindness.',
      image: {
        src: '/images/bw-portrait-seated-ba7f1e8f.jpg',
        alt: 'Black-and-white portrait of Adv. M.A. Jabbar',
        width: 1200,
        height: 1534,
      },
      timeline: [
        'Delegate — United Nations Global Meeting on Sustainable Development, Bonn, Germany',
        'Coordinator — State Disaster Management wireless communications, Sabarimala',
        'Representative of Amnesty International India — People’s Budget Programme, New Delhi',
        // TODO: confirm trust name spelling ("Al Aman" in client notes)
        'Founder & Secretary — Al Aman Educational and Charitable Trust and Al Ameen Public School (CBSE), Pathanapuram',
        'Former National Vice President — National Lawyers Campaign for Judicial Transparency and Reforms',
        'Member — United Nations Millennium Campaign · International Member — Amnesty International',
        'Former Regional Project Manager & Additional Cabinet Secretary — Lions Clubs International, District 324E-1',
      ],
    },

    contact: {
      eyebrow: 'Contact',
      heading: 'Visit the chambers',
      formHeading: 'Send an enquiry',
      matterOptions: [
        'High Court matter (civil / criminal / constitutional)',
        'Corporate or commercial mediation',
        'Securities arbitration (NSE / BSE)',
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
      'Enquiries are kept only as long as needed to respond and to meet professional obligations. To ask for your information to be corrected or deleted, write to vu3jbr@gmail.com.',
      'This website does not use advertising or tracking cookies. It stores one setting in your browser to remember that you have read the disclaimer.',
    ],
  },
};
