/**
 * Official Business Configuration & Operational Branches
 * Clean Shield Pro - Rajamahendravaram & 15+ Operational Hubs
 */

const BUSINESS_CONFIG = {
  name: 'Clean Shield Pro',
  slogan: "We Don't Just Clean, We Care.",
  tagline: 'Clean Home • Healthy Life',
  headquarters: 'Danavaipeta, Rajamahendravaram, Andhra Pradesh - 533103',
  phone1: '+91 90596 39955',
  phone2: '+91 88973 12523',
  whatsapp1: '9059639955',
  whatsapp2: '8897312523',
  email1: 'madhuripaka756@gmail.com',
  email2: 'prasadanem777@gmail.com',
  allEmails: ['madhuripaka756@gmail.com', 'prasadanem777@gmail.com'],
  allWhatsApp: ['9059639955', '8897312523'],
  workingHours: 'Open 7 Days: 7:30 AM – 8:30 PM',
  stats: {
    customerCount: '10,000+',
    customerCountNum: 10000,
    rating: '4.9 ★',
    branchesCount: '15+',
    satisfactionRate: '100%',
    homesCleaned: '10,000+ Homes Cleaned'
  }
};

const BRANCHES_CONFIG = [
  { id: 'rajahmundry', name: 'Rajahmundry (Headquarters)', district: 'East Godavari', isHq: true, phone: '+91 90596 39955', tag: 'Main HQ' },
  { id: 'east-godavari', name: 'East Godavari District Hub', district: 'East Godavari', isHq: false, phone: '+91 90596 39955', tag: 'District Hub' },
  { id: 'west-godavari', name: 'West Godavari District Hub', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'District Hub' },
  { id: 'palakollu', name: 'Palakollu', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'narasapuram', name: 'Narasapuram', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'jaggampeta', name: 'Jaggampeta', district: 'East Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'vijayawada', name: 'Vijayawada', district: 'Krishna / NTR', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'kakinada', name: 'Kakinada', district: 'Kakinada', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'tanuku', name: 'Tanuku', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'tadepalligudem', name: 'Tadepalligudem', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'eluru', name: 'Eluru', district: 'Eluru', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'amalapuram', name: 'Amalapuram', district: 'Dr. B.R. Ambedkar Konaseema', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'ravulapalem', name: 'Ravulapalem', district: 'Dr. B.R. Ambedkar Konaseema', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'bhimavaram', name: 'Bhimavaram', district: 'West Godavari', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'jangareddygudem', name: 'Jangareddygudem', district: 'Eluru', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' },
  { id: 'vizag', name: 'Vizag (Visakhapatnam)', district: 'Visakhapatnam', isHq: false, phone: '+91 90596 39955', tag: 'Active Hub' }
];

module.exports = {
  BUSINESS_CONFIG,
  BRANCHES_CONFIG
};
