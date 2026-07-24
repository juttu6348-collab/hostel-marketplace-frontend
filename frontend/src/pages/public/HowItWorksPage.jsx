import PublicInfoPage from "../../components/common/PublicInfoPage";

const howItWorksSections = [
  {
    heading: "1. Search for hostels",
    paragraphs: [
      "Start by browsing available hostel listings. Use search and filters to narrow the results by location, monthly rent, room type, and facilities.",
    ],
  },
  {
    heading: "2. Review hostel details",
    paragraphs: [
      "Open a hostel listing to review its description, location, facilities, room options, prices, and availability.",
    ],
  },
  {
    heading: "3. Save your favourites",
    paragraphs: [
      "Add suitable hostels to your favourites so that you can return later and compare your preferred options.",
    ],
  },
  {
    heading: "4. Submit a booking request",
    paragraphs: [
      "Select an available room, provide the required booking information, and submit your request to the hostel owner.",
    ],
  },
  {
    heading: "5. Track the request",
    paragraphs: [
      "Use your customer account to review whether the request is pending, accepted, rejected, or cancelled.",
    ],
  },
];

function HowItWorksPage() {
  return (
    <PublicInfoPage
      eyebrow="Simple process"
      title="How HostelHub works"
      introduction="HostelHub provides a clear process for finding suitable accommodation and submitting a booking request."
      sections={howItWorksSections}
    />
  );
}

export default HowItWorksPage;