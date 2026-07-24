const hostelDetails = {
  1: {
    description:
      "City View Boys Hostel provides comfortable and secure accommodation for students studying near NUST and other institutions in Islamabad. The hostel offers furnished rooms, regular meals, high-speed internet and monitored entry.",
    address: "Street 12, H-13, Islamabad",
    securityDeposit: 10000,
    admissionFee: 3000,
    electricityIncluded: false,
    mealIncluded: true,
    managerName: "Ahmed Khan",
    contactHours: "9:00 AM to 8:00 PM",
    gallery: [
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "Breakfast and dinner",
      "Laundry service",
      "CCTV monitoring",
      "Backup generator",
      "Filtered drinking water",
      "Study area",
      "Daily cleaning",
      "Hot water",
      "Motorcycle parking",
    ],
    roomOptions: [
      {
        id: "room-1-a",
        name: "Two-Seater Standard Room",
        occupancy: 2,
        price: 18000,
        availableBeds: 3,
        features: ["Attached bathroom", "Study table", "Wardrobe"],
      },
      {
        id: "room-1-b",
        name: "Single Private Room",
        occupancy: 1,
        price: 28000,
        availableBeds: 1,
        features: ["Private bathroom", "Study table", "Wardrobe"],
      },
      {
        id: "room-1-c",
        name: "Three-Seater Economy Room",
        occupancy: 3,
        price: 14500,
        availableBeds: 4,
        features: ["Shared bathroom", "Study table", "Wardrobe"],
      },
    ],
    policies: [
      "Residents must provide a valid CNIC or student card.",
      "Visitors are allowed only in the designated visitor area.",
      "Smoking is not allowed inside rooms.",
      "Monthly rent must be paid before the fifth day of every month.",
      "One month notice is required before leaving the hostel.",
    ],
    reviews: [
      {
        id: 101,
        reviewerName: "Hamza Ali",
        rating: 5,
        date: "June 18, 2026",
        comment:
          "The location is convenient for NUST students. The rooms are clean and the management responds quickly.",
      },
      {
        id: 102,
        reviewerName: "Bilal Ahmed",
        rating: 4,
        date: "May 29, 2026",
        comment:
          "Good internet and meals. The shared rooms can become crowded during examination periods.",
      },
      {
        id: 103,
        reviewerName: "Saad Khan",
        rating: 5,
        date: "April 11, 2026",
        comment:
          "A secure and professional hostel with helpful staff.",
      },
    ],
  },

  2: {
    description:
      "Comfort Girls Residence offers secure and professionally managed accommodation near FAST University. It is designed for students who need a peaceful environment, structured meals and easy access to public transport.",
    address: "Street 9, I-8/2, Islamabad",
    securityDeposit: 15000,
    admissionFee: 4000,
    electricityIncluded: true,
    mealIncluded: true,
    managerName: "Sara Mahmood",
    contactHours: "8:00 AM to 7:00 PM",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "Three meals daily",
      "24-hour security",
      "Study room",
      "Laundry service",
      "Filtered water",
      "Backup generator",
      "Daily cleaning",
      "Hot water",
      "Biometric entry",
    ],
    roomOptions: [
      {
        id: "room-2-a",
        name: "Private Standard Room",
        occupancy: 1,
        price: 30000,
        availableBeds: 1,
        features: ["Attached bathroom", "Study desk", "Wardrobe"],
      },
      {
        id: "room-2-b",
        name: "Two-Seater Room",
        occupancy: 2,
        price: 22000,
        availableBeds: 2,
        features: ["Shared bathroom", "Study desk", "Wardrobe"],
      },
      {
        id: "room-2-c",
        name: "Three-Seater Room",
        occupancy: 3,
        price: 18000,
        availableBeds: 3,
        features: ["Shared bathroom", "Study table", "Cupboard"],
      },
    ],
    policies: [
      "A valid CNIC, guardian CNIC and student card are required.",
      "Entry after 10:00 PM requires prior permission.",
      "Visitors must register at reception.",
      "Cooking appliances are not allowed inside bedrooms.",
      "One month notice is required before leaving.",
    ],
    reviews: [
      {
        id: 201,
        reviewerName: "Ayesha Malik",
        rating: 5,
        date: "July 2, 2026",
        comment:
          "Very secure and clean. The study environment is excellent.",
      },
      {
        id: 202,
        reviewerName: "Maham Noor",
        rating: 5,
        date: "June 10, 2026",
        comment:
          "The staff is professional and the location is convenient for FAST students.",
      },
    ],
  },

  3: {
    description:
      "Scholars Student Hostel provides affordable accommodation in Johar Town for university students. It offers shared rooms, transport access and essential daily facilities.",
    address: "Block C, Johar Town, Lahore",
    securityDeposit: 8000,
    admissionFee: 2500,
    electricityIncluded: false,
    mealIncluded: true,
    managerName: "Usman Raza",
    contactHours: "9:00 AM to 9:00 PM",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    ],
    facilities: [
      "Wi-Fi",
      "Generator",
      "Mess",
      "Parking",
      "Filtered water",
      "Hot water",
      "Laundry area",
      "Study tables",
    ],
    roomOptions: [
      {
        id: "room-3-a",
        name: "Three-Seater Standard Room",
        occupancy: 3,
        price: 16000,
        availableBeds: 5,
        features: ["Shared bathroom", "Wardrobe", "Study table"],
      },
      {
        id: "room-3-b",
        name: "Four-Seater Economy Room",
        occupancy: 4,
        price: 13000,
        availableBeds: 2,
        features: ["Shared bathroom", "Cupboard", "Ceiling fan"],
      },
    ],
    policies: [
      "Students must provide identification documents.",
      "Rent must be paid monthly in advance.",
      "Visitors are restricted to reception.",
      "Residents are responsible for personal belongings.",
    ],
    reviews: [
      {
        id: 301,
        reviewerName: "Ali Hassan",
        rating: 4,
        date: "May 16, 2026",
        comment:
          "Affordable and close to major universities in Johar Town.",
      },
    ],
  },
};

export default hostelDetails;