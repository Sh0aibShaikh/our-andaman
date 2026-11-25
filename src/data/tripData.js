/** All trip content — edit here, not in components. */

export const TRIP = {
  /** Home-screen / header name — change here to rename the app everywhere content-driven. */
  name: 'Our Andaman',
  shortName: 'Our Andaman',
  tagline: 'Your calm honeymoon companion',
  startDate: '2026-12-30',
  endDate: '2027-01-05',
  timezone: 'Asia/Kolkata',
}

export const defaultTimes = {
  flightArrival: '11:25',
  flightArrivalNote: 'BOM 08:10 → IXZ 11:25',
  flightDepartOutbound: '08:10',
  ferryJan1: '07:30',
  ferryJan1Arrive: '09:15',
  ferryJan3: '09:15',
  ferryJan3Arrive: '10:30',
  ferryJan4: '11:00',
  ferryJan4Arrive: '12:45',
  returnFlight: '12:00',
  returnFlightArrive: '15:20',
  wakeOffsetHours: 2,
}

export const contacts = [
  {
    id: 'bliss-main',
    label: 'Andaman Bliss helpline (24×7)',
    phone: '+918900909900',
    display: '+91-8900909900',
  },
  {
    id: 'bliss-alt',
    label: 'Andaman Bliss alt',
    phone: '+919933202248',
    display: '+91-9933202248',
  },
  {
    id: 'isha',
    label: 'Isha Travels (night kayaking)',
    phone: '+919476076338',
    display: '+91 94760 76338',
  },
]

export const alwaysCarry = [
  { id: 'ac-cash', label: 'Cash' },
  { id: 'ac-sunscreen', label: 'Sunscreen' },
  { id: 'ac-sunglasses', label: 'Sunglasses' },
  { id: 'ac-cap', label: 'Cap' },
  { id: 'ac-charger', label: 'Phone charger' },
  { id: 'ac-powerbank', label: 'Power bank' },
  { id: 'ac-water', label: 'Water bottle' },
  { id: 'ac-ids', label: 'IDs' },
]

export const preTripTodos = [
  { id: 'pt-36k', label: 'Carry ₹36,000 cash for the agent balance' },
  { id: 'pt-25k', label: 'Carry ₹25,000 cash for expenses (split across bags and pockets)' },
  { id: 'pt-pan', label: 'Keep original PAN card (needed for cash payment)' },
  { id: 'pt-ids', label: 'Keep original photo IDs with address for both people' },
  { id: 'pt-voucher', label: 'Download voucher and documents offline' },
  { id: 'pt-meds', label: 'Pack medicines' },
  { id: 'pt-checklist', label: 'Buy items on the Checklist' },
  { id: 'pt-charge', label: 'Charge power bank / GoPro' },
  { id: 'pt-verify', label: 'Confirm items on Verify tab' },
  { id: 'pt-ferry', label: 'Enter ferry times in the app when the agent messages them' },
]

export const checklistGroups = [
  {
    id: 'travel',
    title: 'Travel essentials',
    items: [
      { id: 'tr-trolley', label: 'Trolley bag' },
      { id: 'tr-backpack', label: 'Small backpack' },
      { id: 'tr-pillow', label: 'Neck pillow' },
      { id: 'tr-bottle', label: 'Small water bottle (from home)' },
      { id: 'tr-powerbank', label: 'Power bank' },
      { id: 'tr-charger', label: 'Phone charger' },
      { id: 'tr-gopro', label: 'GoPro (+ charger, memory card)' },
      { id: 'tr-ids', label: 'Original IDs' },
      { id: 'tr-pan', label: 'PAN card' },
      { id: 'tr-voucher', label: 'Printed or offline voucher' },
      { id: 'tr-cash', label: 'Cash' },
    ],
  },
  {
    id: 'beach',
    title: 'Beach',
    items: [
      { id: 'be-sunscreen', label: 'Sunscreen / sun cream' },
      { id: 'be-sunglasses', label: 'Sunglasses' },
      { id: 'be-cap', label: 'Cap' },
      { id: 'be-swim', label: 'Swimwear / nylon clothes (for both)' },
      { id: 'be-extra', label: 'Extra clothes' },
      { id: 'be-towel', label: 'Towel' },
      { id: 'be-pouch', label: 'Waterproof phone pouch' },
      { id: 'be-gopro', label: 'GoPro' },
    ],
  },
  {
    id: 'clothing',
    title: 'Clothing',
    items: [
      { id: 'cl-light', label: 'Light thin clothes' },
      { id: 'cl-jacket', label: 'One light jacket' },
      { id: 'cl-swim', label: 'Swim clothes' },
    ],
  },
  {
    id: 'medicines',
    title: 'Medicines',
    items: [
      { id: 'med-fever', label: 'Fever medicine' },
      { id: 'med-headache', label: 'Headache medicine' },
      { id: 'med-pain', label: 'Painkiller' },
      { id: 'med-electrolyte', label: 'Electrolyte powder' },
      { id: 'med-motion', label: 'Motion sickness medicine (if needed)' },
    ],
  },
  {
    id: 'snacks',
    title: 'Snacks',
    items: [
      { id: 'sn-dry', label: 'Dry fruits' },
      { id: 'sn-choco', label: 'Chocolates' },
      { id: 'sn-candies', label: 'Candies' },
      { id: 'sn-khatti', label: 'Khatti-meethi goli' },
      { id: 'sn-electrolyte', label: 'Electrolyte powder' },
    ],
  },
  {
    id: 'cash',
    title: 'Cash',
    items: [
      { id: 'ca-36k', label: '₹36,000 for agent balance' },
      { id: 'ca-25k', label: '₹25,000 for expenses, split across places' },
    ],
  },
]

export const activities = [
  { id: 'scuba-shore', label: 'DSD Shore Scuba', voucherPrice: 3500, defaultChoice: 'yes' },
  { id: 'scuba-boat', label: 'DSD Boat Scuba', voucherPrice: 5500, defaultChoice: 'maybe' },
  { id: 'snorkel-shore', label: 'Shore Snorkelling', voucherPrice: 2500, defaultChoice: 'maybe' },
  { id: 'snorkel-boat', label: 'Deep Water Boat Snorkelling', voucherPrice: 3500, defaultChoice: 'maybe' },
  { id: 'seawalk', label: 'Underwater SeaWalk', voucherPrice: 3800, defaultChoice: 'no' },
  { id: 'scooter', label: 'Underwater Scooter', voucherPrice: 4800, defaultChoice: 'no' },
  { id: 'jetski', label: 'Jet Ski', voucherPrice: 1000, defaultChoice: 'yes' },
  { id: 'glassbottom', label: 'Glass Bottom Boat', voucherPrice: 1800, defaultChoice: 'no' },
  { id: 'speedboat', label: 'Speedboat', voucherPrice: 800, defaultChoice: 'no' },
  { id: 'kayak', label: 'Day/Night Kayaking', voucherPrice: 3500, defaultChoice: 'maybe' },
]

export const verifyItems = [
  {
    id: 'v-photoshoot',
    label:
      'Photoshoot at Radhanagar: voucher says 31 Dec, but I am at Baratang that day. Confirm real date and time (likely 1 Jan).',
    critical: true,
  },
  {
    id: 'v-stargazing',
    label:
      'Stargazing at Neil: voucher says 2 Jan, but I only reach Neil on 3 Jan. Confirm date.',
    critical: true,
  },
  {
    id: 'v-candlelight',
    label: 'Candlelight dinner at Havelock: date, place, time',
    critical: true,
  },
  {
    id: 'v-shopping',
    label: 'Shopping trip in Port Blair: date (likely 4 or 5 Jan)',
    critical: false,
  },
  {
    id: 'v-ferry',
    label: 'Ferry times for all three ferries',
    critical: true,
  },
  {
    id: 'v-cottage',
    label: 'Sea-view cottage confirmed at Havelock Exotic ("or similar" wording)',
    critical: true,
  },
  {
    id: 'v-payment',
    label: 'Paying the ₹36,000 balance in cash on arrival is OK, and get a receipt',
    critical: true,
  },
  {
    id: 'v-jetski',
    label: 'Jet Ski: ride type and duration (voucher says "undefined"), final price',
    critical: false,
  },
  {
    id: 'v-kayak',
    label:
      'Night kayaking: cousin said ₹1,500/person, voucher says ₹3,500/person. Confirm price, operator, 3:30 AM timing, location',
    critical: true,
  },
  {
    id: 'v-scuba',
    label:
      'Scuba: location (Elephant Beach vs Bharatpur), shore vs boat, instructor, photos/video, duration, final price, both can dive together',
    critical: true,
  },
  {
    id: 'v-soundlight',
    label: 'Sound & Light Show time and Cellular Jail closing time',
    critical: false,
  },
  {
    id: 'v-airport',
    label: 'Airport pickup and drop-off timings',
    critical: true,
  },
  {
    id: 'v-meals',
    label: 'Meals: dinner plan at Havelock Exotic on 1 Jan (breakfast only)',
    critical: false,
  },
  {
    id: 'v-scooty',
    label: 'Scooty rental in Port Blair: availability, documents, price (about ₹500/24h per cousin)',
    critical: false,
  },
]

export const complimentaryUnscheduled = [
  'Beachside candlelight dinner at Havelock (date TBC)',
  'Radhanagar photoshoot (date TBC — likely 1 Jan)',
  'Stargazing at Neil (date TBC — after 3 Jan)',
  'Shopping trip in Port Blair (likely 4 or 5 Jan)',
]

export const quickTips = [
  'Network can be poor — carry cash, keep docs offline, keep power bank charged.',
  'Weather mixes sunny, rainy and cool evenings — pack a light jacket.',
  'Peak season: expect crowds at Radhanagar and popular beaches; go early when you can.',
  'Do not store Aadhaar numbers, ID scans or bank details in this app.',
]

/** Day index 1–7 */
export const days = [
  {
    day: 1,
    date: '2026-12-30',
    weekday: 'Wednesday',
    location: 'Port Blair',
    route: 'Arrive Port Blair',
    hotel: 'Hotel Sweneha Grand',
    room: 'Deluxe Room',
    mealPlan: 'MAP',
    ferry: null,
    carryExtra: [
      { id: 'd1-pan', label: 'Original PAN card' },
      { id: 'd1-36k', label: '₹36,000 cash for agent' },
      { id: 'd1-voucher', label: 'Voucher / booking docs' },
    ],
    timeline: [
      { id: 'd1-t1', label: 'Land at Port Blair (IXZ)', booked: true },
      { id: 'd1-t2', label: 'Meet Andaman Bliss at airport', booked: true },
      { id: 'd1-t3', label: 'Pay ₹36,000 cash + show PAN + get receipt', booked: true },
      { id: 'd1-t4', label: 'Transfer to Hotel Sweneha Grand & check in', booked: true },
      { id: 'd1-t5', label: "Corbyn's Cove Beach", booked: true },
      { id: 'd1-t6', label: 'Cellular Jail', booked: true },
      { id: 'd1-t7', label: 'Sound & Light Show', booked: true },
      { id: 'd1-t8', label: 'Dinner at hotel (MAP)', booked: true },
    ],
    arrivalSteps: [
      {
        id: 'a1',
        title: 'Land at Port Blair',
        detail:
          'Flight BOM 08:10 → IXZ 11:25. Arrival time is editable in More.',
      },
      {
        id: 'a2',
        title: 'Meet Andaman Bliss',
        detail: 'Look for the Andaman Bliss representative at the airport.',
      },
      {
        id: 'a3',
        title: 'Pay the balance',
        detail:
          'Pay ₹36,000 in cash before services begin. Show the original PAN card. Get a receipt.',
      },
      {
        id: 'a4',
        title: 'Hotel check-in',
        detail: 'Transfer to Hotel Sweneha Grand and check in (Deluxe, MAP).',
      },
      {
        id: 'a5',
        title: "Corbyn's Cove Beach",
        detail: 'Afternoon beach time.',
      },
      {
        id: 'a6',
        title: 'Cellular Jail',
        detail: 'Visit Cellular Jail. Confirm closing time.',
      },
      {
        id: 'a7',
        title: 'Sound & Light Show',
        detail: 'Confirm show time with the agent.',
      },
      {
        id: 'a8',
        title: 'Dinner at hotel',
        detail: 'Dinner included (MAP). Dark by about 5 PM — plan photos earlier.',
      },
    ],
    arrivalNote:
      'Dark by about 5 PM. Confirm Sound & Light Show time and Cellular Jail closing time.',
    booked: ["Arrival", "Corbyn's Cove", 'Cellular Jail', 'Sound & Light Show'],
    optional: [],
    headsUp: 'Early start tomorrow for Baratang (~110 km before daybreak). Eat light tonight.',
    foodTips: [],
    notes: [],
  },
  {
    day: 2,
    date: '2026-12-31',
    weekday: 'Thursday',
    location: 'Baratang',
    route: 'Port Blair ↔ Baratang',
    hotel: 'Hotel Sweneha Grand',
    room: 'Deluxe Room',
    mealPlan: 'MAP',
    ferry: null,
    carryExtra: [
      { id: 'd2-water', label: 'Plenty of water' },
      { id: 'd2-dry', label: 'Dry fruits & chocolates' },
      { id: 'd2-candies', label: 'Khatti-meethi candies' },
      { id: 'd2-pillow', label: 'Neck pillow' },
      { id: 'd2-meds', label: 'Basic medicines' },
      { id: 'd2-smallbottle', label: 'Small water bottle' },
    ],
    timeline: [
      { id: 'd2-t1', label: 'Early road trip ~110 km to Baratang', booked: true },
      { id: 'd2-t2', label: 'Nilambur Jetty', booked: true },
      { id: 'd2-t3', label: '~15 min boat through mangroves', booked: true },
      { id: 'd2-t4', label: 'Limestone Caves', booked: true },
      { id: 'd2-t5', label: 'Return to Port Blair / hotel', booked: true },
    ],
    booked: ['Baratang road trip', 'Nilambur Jetty', 'Mangrove boat', 'Limestone Caves'],
    optional: [],
    headsUp: 'Tomorrow: Nautika ferry Port Blair → Havelock at 07:30. Wake early.',
    foodTips: [],
    notes: ['Long early start — light food only.'],
  },
  {
    day: 3,
    date: '2027-01-01',
    weekday: 'Friday',
    location: 'Port Blair → Havelock',
    route: 'Port Blair → Havelock (Swaraj Dweep)',
    hotel: 'Havelock Exotic Beach Resort',
    room: 'Sea View Deluxe Cottage',
    mealPlan: 'Breakfast only (CP)',
    ferry: {
      operator: 'Nautika Luxury',
      from: 'Port Blair',
      to: 'Havelock (Swaraj Dweep)',
      timeKey: 'ferryJan1',
      arriveKey: 'ferryJan1Arrive',
      duration: '~1h 30m',
    },
    carryExtra: [
      { id: 'd3-pillow', label: 'Neck pillow for ferry' },
      { id: 'd3-water', label: 'Water & candies' },
      { id: 'd3-meds', label: 'Motion sickness meds if needed' },
      { id: 'd3-swim', label: 'Swimwear for Radhanagar' },
    ],
    timeline: [
      { id: 'd3-t1', label: 'Nautika ferry to Havelock', booked: true },
      { id: 'd3-t2', label: 'Kalapathar Beach (photos)', booked: true },
      { id: 'd3-t3', label: 'Optional pro photographer at Kalapathar', booked: false },
      { id: 'd3-t4', label: 'Radhanagar Beach (swim if safe, sunset)', booked: true },
      { id: 'd3-t5', label: 'Check in — Sea View Deluxe Cottage', booked: true },
    ],
    booked: ['Nautika ferry', 'Kalapathar Beach', 'Radhanagar Beach', 'Havelock Exotic check-in'],
    optional: ['Pro photographer at Kalapathar', 'Radhanagar photoshoot if confirmed'],
    headsUp: 'Tomorrow: Elephant Beach + optional scuba. Eat light before diving. Skip 3:30 AM kayak if scuba.',
    foodTips: ['Prawns Masala + Butter Garlic Naan (recommendation).'],
    notes: ['Dinner not included at Havelock Exotic (CP) — confirm dinner plan.'],
  },
  {
    day: 4,
    date: '2027-01-02',
    weekday: 'Saturday',
    location: 'Havelock',
    route: 'Havelock — Elephant Beach',
    hotel: 'Green Wood Beach Resort',
    room: 'Premium Room',
    mealPlan: 'MAP',
    ferry: null,
    carryExtra: [
      { id: 'd4-swim', label: 'Swimwear' },
      { id: 'd4-gopro', label: 'GoPro' },
      { id: 'd4-pouch', label: 'Waterproof phone pouch' },
      { id: 'd4-cash', label: 'Cash for optional activities' },
    ],
    timeline: [
      { id: 'd4-t1', label: 'Elephant Beach (speed boat included)', booked: true },
      { id: 'd4-t2', label: 'Optional: scuba (both)', booked: false },
      { id: 'd4-t3', label: 'Optional: jet ski (both)', booked: false },
      { id: 'd4-t4', label: 'Optional: snorkelling', booked: false },
      { id: 'd4-t5', label: 'Optional: night kayaking 3:30 AM (TBC)', booked: false },
      { id: 'd4-t6', label: 'Check in Green Wood Beach Resort', booked: true },
    ],
    booked: ['Elephant Beach (speed boat included)', 'Green Wood Beach Resort'],
    optional: ['Scuba (both)', 'Jet ski (both)', 'Snorkelling', 'Night kayaking 3:30 AM TBC'],
    headsUp: 'Tomorrow: Green Ocean ferry Havelock → Neil at 09:15. Natural Bridge ~3 PM — check tide.',
    foodTips: [],
    notes: [],
  },
  {
    day: 5,
    date: '2027-01-03',
    weekday: 'Sunday',
    location: 'Havelock → Neil',
    route: 'Havelock → Neil (Shaheed Dweep)',
    hotel: 'Save Green Resort',
    room: 'Deluxe Room',
    mealPlan: 'MAP',
    ferry: {
      operator: 'Green Ocean (Economy)',
      from: 'Havelock Jetty',
      to: 'Neil Jetty',
      timeKey: 'ferryJan3',
      arriveKey: 'ferryJan3Arrive',
      duration: '1h 15m',
    },
    carryExtra: [
      { id: 'd5-pillow', label: 'Neck pillow for ferry' },
      { id: 'd5-water', label: 'Water & candies' },
      { id: 'd5-camera', label: 'Phone/GoPro for Natural Bridge' },
    ],
    timeline: [
      { id: 'd5-t1', label: 'Green Ocean ferry to Neil', booked: true },
      { id: 'd5-t2', label: 'Bharatpur Beach', booked: true },
      { id: 'd5-t3', label: 'Optional scuba / snorkelling at Bharatpur', booked: false },
      { id: 'd5-t4', label: 'Natural Bridge ~3 PM (check tide, couple photos)', booked: true },
      { id: 'd5-t5', label: 'Laxmanpur Beach', booked: true },
      { id: 'd5-t6', label: 'Check in Save Green Resort', booked: true },
    ],
    booked: [
      'Green Ocean ferry',
      'Bharatpur Beach',
      'Natural Bridge',
      'Laxmanpur Beach',
      'Save Green Resort',
    ],
    optional: ['Scuba / snorkelling at Bharatpur', 'Stargazing if confirmed'],
    headsUp: 'Tomorrow: Green Ocean Neil → Port Blair (Haddo Gate-3) at 11:00.',
    foodTips: [],
    notes: ['Halal chicken may be hard to find on Neil — confirm before ordering.'],
  },
  {
    day: 6,
    date: '2027-01-04',
    weekday: 'Monday',
    location: 'Neil → Port Blair',
    route: 'Neil → Port Blair',
    hotel: 'Hotel Sweneha Grand',
    room: 'Deluxe Room',
    mealPlan: 'MAP',
    ferry: {
      operator: 'Green Ocean (Economy)',
      from: 'Neil Jetty',
      to: 'Port Blair Haddo (Gate-3)',
      timeKey: 'ferryJan4',
      arriveKey: 'ferryJan4Arrive',
      duration: '1h 45m',
    },
    carryExtra: [
      { id: 'd6-pillow', label: 'Neck pillow for ferry' },
      { id: 'd6-water', label: 'Water & candies' },
      { id: 'd6-ids', label: 'IDs handy for evening plans' },
    ],
    timeline: [
      { id: 'd6-t1', label: 'Green Ocean ferry to Port Blair (Haddo Gate-3)', booked: true },
      { id: 'd6-t2', label: 'Ross Island', booked: true },
      { id: 'd6-t3', label: 'Chidiya Tapu sunset', booked: true },
      { id: 'd6-t4', label: 'Check in Hotel Sweneha Grand', booked: true },
    ],
    booked: ['Green Ocean ferry', 'Ross Island', 'Chidiya Tapu', 'Sweneha Grand'],
    optional: ['Anand Hotel crab (Aberdeen Bazaar)', 'Shopping trip if confirmed'],
    headsUp: 'Tomorrow: departure. Flight IXZ 12:00 → BOM 15:20. Pack tonight.',
    foodTips: ['Anand Hotel, Aberdeen Bazaar — crab (recommendation, not booked).'],
    notes: [],
  },
  {
    day: 7,
    date: '2027-01-05',
    weekday: 'Tuesday',
    location: 'Port Blair → Mumbai',
    route: 'Port Blair → Mumbai',
    hotel: null,
    room: null,
    mealPlan: 'Breakfast',
    ferry: null,
    carryExtra: [
      { id: 'd7-tickets', label: 'Boarding passes / tickets' },
      { id: 'd7-ids', label: 'IDs' },
      { id: 'd7-cash', label: 'Leftover cash secured' },
    ],
    timeline: [
      { id: 'd7-t1', label: 'Breakfast', booked: true },
      { id: 'd7-t2', label: 'Pack & check room', booked: true },
      { id: 'd7-t3', label: 'Airport drop (included)', booked: true },
      { id: 'd7-t4', label: 'Flight IXZ 12:00 → BOM 15:20', booked: true },
    ],
    booked: ['Breakfast', 'Airport drop', 'Return flight'],
    optional: ['Shopping if still pending'],
    headsUp: null,
    foodTips: [],
    notes: ['Keep tickets and IDs handy; leave for the airport on time.'],
  },
]

export function getDayByDate(dateStr) {
  return days.find((d) => d.date === dateStr) || null
}

export function getDayByIndex(index) {
  return days.find((d) => d.day === index) || null
}
