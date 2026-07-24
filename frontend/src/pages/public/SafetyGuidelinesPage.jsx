import PublicInfoPage from "../../components/common/PublicInfoPage";

const safetySections = [
  {
    heading: "Verify before making payment",
    items: [
      "Visit the hostel personally whenever possible.",
      "Confirm the identity of the property owner or manager.",
      "Request a written receipt for every payment.",
      "Avoid transferring money to unknown accounts.",
    ],
  },
  {
    heading: "Inspect the accommodation",
    items: [
      "Check room condition, locks, lighting, and ventilation.",
      "Review electricity, water, internet, and security arrangements.",
      "Ask about emergency exits and fire-safety equipment.",
      "Confirm whether the displayed facilities are available.",
    ],
  },
  {
    heading: "Understand the agreement",
    items: [
      "Read rent, deposit, refund, and cancellation conditions.",
      "Confirm notice-period requirements.",
      "Keep a copy of the signed rental agreement.",
      "Do not rely only on verbal promises.",
    ],
  },
  {
    heading: "Protect your information",
    items: [
      "Do not share passwords or one-time verification codes.",
      "Provide identification documents only when necessary.",
      "Report suspicious listings or users to platform support.",
    ],
  },
];

function SafetyGuidelinesPage() {
  return (
    <PublicInfoPage
      eyebrow="Stay informed"
      title="Hostel safety guidelines"
      introduction="Use these precautions when communicating with owners, inspecting accommodation, signing agreements, or making payments."
      sections={safetySections}
    />
  );
}

export default SafetyGuidelinesPage;