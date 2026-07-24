import PublicInfoPage from "../../components/common/PublicInfoPage";

const privacySections = [
  {
    heading: "Information we collect",
    paragraphs: [
      "The demonstration may store account details, favourites, hostel listings, room data, and booking requests inside the browser's local storage.",
    ],
  },
  {
    heading: "How information is used",
    paragraphs: [
      "Information is used to demonstrate authentication, marketplace listings, booking requests, owner management, and administrative workflows.",
    ],
  },
  {
    heading: "Local browser storage",
    paragraphs: [
      "Because this is currently a frontend demonstration, information may remain on the device and browser where it was created. Clearing browser storage may remove that information.",
    ],
  },
  {
    heading: "Future backend implementation",
    paragraphs: [
      "When backend development begins, authentication, data storage, authorization, encryption, and privacy controls will be implemented through secure server-side services.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about privacy can be sent to support@hostelhub.demo.",
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <PublicInfoPage
      eyebrow="Privacy"
      title="Privacy policy"
      introduction="This page explains how information is handled in the current HostelHub frontend demonstration."
      sections={privacySections}
    />
  );
}

export default PrivacyPolicyPage;