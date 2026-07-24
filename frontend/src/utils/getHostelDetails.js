import hostelDetails from "../data/hostelDetails";

function createFallbackDetails(hostel) {
  return {
    description: `${hostel.name} provides furnished accommodation in ${hostel.area}, ${hostel.city}. Residents can compare room availability, facilities and monthly pricing before requesting a booking.`,
    address: `${hostel.area}, ${hostel.city}`,
    securityDeposit: Math.round(hostel.price * 0.5),
    admissionFee: 2500,
    electricityIncluded: false,
    mealIncluded: hostel.facilities.some((facility) =>
      ["Mess", "Meals"].includes(facility),
    ),
    managerName: "Hostel Management",
    contactHours: "9:00 AM to 7:00 PM",
    gallery: [
      hostel.image,
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: [
      ...hostel.facilities,
      "Filtered drinking water",
      "Regular cleaning",
      "Hot water",
      "Resident support",
    ],
    roomOptions: [
      {
        id: `room-${hostel.id}-standard`,
        name: hostel.roomType,
        occupancy: 2,
        price: hostel.price,
        availableBeds: hostel.availableBeds,
        features: ["Furnished room", "Wardrobe", "Study space"],
      },
      {
        id: `room-${hostel.id}-private`,
        name: "Private Room",
        occupancy: 1,
        price: hostel.price + 8000,
        availableBeds: Math.max(1, Math.floor(hostel.availableBeds / 2)),
        features: ["Private space", "Wardrobe", "Study table"],
      },
    ],
    policies: [
      "Valid identification documents are required.",
      "Monthly rent must be paid in advance.",
      "Visitors must follow hostel visitor rules.",
      "Residents must follow safety and cleanliness policies.",
    ],
    reviews: [
      {
        id: hostel.id * 1000 + 1,
        reviewerName: "Verified Resident",
        rating: Math.round(hostel.rating),
        date: "June 2026",
        comment:
          "The hostel offers useful facilities and a convenient location.",
      },
    ],
  };
}

function getHostelDetails(hostel) {
  if (!hostel) {
    return null;
  }

  const additionalDetails =
    hostelDetails[hostel.id] || createFallbackDetails(hostel);

  return {
    ...hostel,
    ...additionalDetails,
  };
}

export default getHostelDetails;