import "./FeaturesSection.css";

const features = [
  {
    id: 1,
    number: "01",
    title: "Verified hostel listings",
    description:
      "View structured hostel profiles with room details, facilities, pricing and verification information.",
  },
  {
    id: 2,
    number: "02",
    title: "Search near institutions",
    description:
      "Find accommodation near universities, colleges, workplaces and important city locations.",
  },
  {
    id: 3,
    number: "03",
    title: "Transparent monthly costs",
    description:
      "Understand rent, security deposits, meal charges and additional expenses before making a decision.",
  },
];

function FeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-heading center">
          <span className="section-eyebrow">Built for better decisions</span>

          <h2 className="section-title">
            Everything needed to find the right hostel
          </h2>

          <p className="section-description">
            HostelHub makes hostel discovery simpler, safer and more
            transparent for students and professionals.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card card" key={feature.id}>
              <span className="feature-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;