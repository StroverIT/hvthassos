export const SITE = {
  brandLabel: "Holiday Villa Thassos",
  addressLabel: "Kinira 64004, Thassos, Greece",
  emailLabel: "info@hvthassos.com",
  phones: [
    "+30 6934135350",
    "+359 898575335",
    "+30 2593041222",
    "+359 888524400",
  ],
  gps: {
    lat: 40.6723619,
    lng: 24.7602292,
  },
  licenseLabel: "0155K112K0106800",
  facebookUrl: "https://www.facebook.com/Holiday-villa-Thassos-1051174558300852/",
  checkInLabel: "14:00–23:00",
  checkOutLabel: "07:00–10:30",
  tourUrl:
    "https://be-there.eu/index.php/vr/holiday-villa-thasos/fullscreen-nobrand/?embedded",
  mapEmbedUrl:
    "https://www.google.com/maps?q=40.6723619,24.7602292&z=15&output=embed",
} as const;

export const SEASON_PERIODS = [
  "01.06.–15.06.",
  "16.06.–30.06.",
  "01.07.–15.07.",
  "16.07.–31.08.",
  "01.09.–15.09.",
  "16.09.–30.09.",
] as const;

export const HERO_IMAGES = [
  "/images/hero/DJI_0177-min.jpg",
  "/images/hero/DJI_0180-min.jpg",
  "/images/hero/IMG_1439-min.jpg",
  "/images/hero/IMG_1524-min.jpg",
  "/images/hero/IMG_1580-HDR-min.jpg",
  "/images/hero/IMG_1611-HDR-min.jpg",
  "/images/hero/IMG_1641-min.jpg",
  "/images/hero/IMG_1650-min.jpg",
  "/images/hero/IMG_1656-min.jpg",
  "/images/hero/IMG_1660-HDR-min.jpg",
  "/images/hero/IMG_1512-HDR-min.jpg",
  "/images/hero/2_1_.jpg",
] as const;

export const STUDIO_IMAGES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 25, 26,
].map((n) => `/images/accommodation/studio/studio-${n}.jpg`);

export const APARTMENT_IMAGES = [
  1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
].map((n) => `/images/accommodation/apartment/apartment-${n}.jpg`);

export const GALLERY_IMAGES = [
  "/images/gallery/DJI_0183-min.jpg",
  "/images/gallery/IMG_1411-min.jpg",
  "/images/gallery/IMG_1423-HDR-min.jpg",
  "/images/gallery/IMG_1430-min.jpg",
  "/images/gallery/IMG_1431-min_1_.jpg",
  "/images/gallery/IMG_1434-min_1_.jpg",
  "/images/gallery/IMG_1436-min_1_.jpg",
  "/images/gallery/IMG_1437-min_1_.jpg",
  "/images/gallery/IMG_1439-min_1_.jpg",
  "/images/gallery/IMG_1440-min_1_.jpg",
  "/images/gallery/IMG_1451-HDR-min_1_.jpg",
  "/images/gallery/IMG_1464-min.jpg",
  "/images/gallery/IMG_1465-min_1_.jpg",
  "/images/gallery/IMG_1481-min_1_.jpg",
  "/images/gallery/IMG_1488-HDR-min.jpg",
  "/images/gallery/IMG_1512-HDR-min_1_.jpg",
  "/images/gallery/IMG_1523-min.jpg",
  "/images/gallery/IMG_1524-min.jpg",
  "/images/gallery/IMG_1526-min_1_.jpg",
  "/images/gallery/IMG_1529-min_1_.jpg",
  "/images/gallery/IMG_1607-min.jpg",
  "/images/gallery/IMG_1611-HDR-min.jpg",
  "/images/gallery/IMG_1632-HDR-min.jpg",
  "/images/gallery/IMG_1641-min.jpg",
  "/images/gallery/IMG_1647-HDR-min.jpg",
  "/images/gallery/IMG_1656-min.jpg",
  "/images/gallery/IMG_1660-HDR-min.jpg",
  "/images/gallery/ext-4.jpg",
  "/images/gallery/ext-5.jpg",
  "/images/gallery/ext-8.jpg",
  "/images/gallery/ext-9.jpg",
  "/images/gallery/ext-11.jpg",
  "/images/gallery/ext-12.jpg",
  "/images/gallery/ext-13.jpg",
  "/images/gallery/ext-16.jpg",
  "/images/gallery/12_3_.jpg",
  "/images/gallery/16_2_.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/5_3_.jpg",
  "/images/gallery/8_4_.jpg",
  "/images/gallery/9_4_.jpg",
  "/images/gallery/IMG_4417.jpg",
] as const;

export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/accommodation", key: "accommodation" },
  { href: "/services", key: "services" },
  { href: "/reservation", key: "reservation" },
  { href: "/villa-policy", key: "villaPolicy" },
  { href: "/gallery", key: "gallery" },
  { href: "/virtual-tour", key: "virtualTour" },
  { href: "/thassos", key: "thassos" },
  { href: "/location", key: "location" },
  { href: "/contact", key: "contact" },
] as const;
