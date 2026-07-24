import PublicInfoPage from "../../components/common/PublicInfoPage";

const termsSections = [
  {
    heading: "Marketplace role",
    paragraphs: [
      "HostelHub provides a digital marketplace through which users may discover listings and submit booking requests.",
      "The platform does not currently process payments or create legally binding rental agreements.",
    ],
  },
  {
    heading: "User responsibilities",
    items: [
      "Provide accurate account and booking information.",
      "Do not publish misleading hostel information.",
      "Do not misuse another person's identity.",
      "Do not attempt to interfere with platform functionality.",
    ],
  },
  {
    heading: "Owner responsibilities",
    items: [
      "Provide accurate property, room, rent, and facility details.",
      "Keep room availability reasonably up to date.",
      "Respond professionally to booking requests.",
      "Follow applicable rental and accommodation laws.",
    ],
  },
  {
    heading: "Listing moderation",
    paragraphs: [
      "Administrators may approve, reject, suspend, or remove demonstration listings that are incomplete, misleading, unsafe, or inappropriate.",
    ],
  },
  {
    heading: "Demonstration limitation",
    paragraphs: [
      "The current version is intended for learning and frontend demonstration. Features and stored information may change during continued project development.",
    ],
  },
];

function TermsAndConditionsPage() {
  return (
    <PublicInfoPage
      eyebrow="Platform rules"
      title="Terms and conditions"
      introduction="These terms explain the expected behaviour of customers, owners, and administrators using the HostelHub demonstration."
      sections={termsSections}
    />
  );
}

export default TermsAndConditionsPage;