import PublicInfoPage from "../../components/common/PublicInfoPage";

const aboutSections = [
  {
    heading: "What HostelHub provides",
    paragraphs: [
      "HostelHub brings hostel owners and accommodation seekers together through a simple digital marketplace.",
      "Customers can browse hostel information, review room availability, save favourite properties, and submit booking requests.",
    ],
  },
  {
    heading: "For hostel seekers",
    items: [
      "Search listings by city, area, price, and facilities.",
      "Review available rooms and monthly rent information.",
      "Save favourite hostels for later comparison.",
      "Submit and manage booking requests.",
    ],
  },
  {
    heading: "For hostel owners",
    items: [
      "Create and manage hostel listings.",
      "Add room types, prices, facilities, and availability.",
      "Submit listings for administrative approval.",
      "Publish approved listings to the marketplace.",
    ],
  },
  {
    heading: "Our demonstration purpose",
    paragraphs: [
      "This version of HostelHub is currently a frontend demonstration. Its data is stored locally in the browser and will later be connected to a secure backend and database.",
    ],
  },
];

function AboutPage() {
  return (
    <PublicInfoPage
      eyebrow="About HostelHub"
      title="A simpler way to discover hostel accommodation"
      introduction="HostelHub is designed to make hostel discovery, comparison, and booking-request management easier for students, professionals, travellers, and property owners."
      sections={aboutSections}
    />
  );
}

export default AboutPage;