import "./PublicInfoPage.css";

function PublicInfoPage({
  eyebrow,
  title,
  introduction,
  sections,
}) {
  return (
    <main className="public-info-page">
      <section className="public-info-hero">
        <div className="container public-info-hero-content">
          {eyebrow && (
            <span className="section-eyebrow">
              {eyebrow}
            </span>
          )}

          <h1>{title}</h1>

          <p>{introduction}</p>
        </div>
      </section>

      <section className="container public-info-content">
        {sections.map((section) => (
          <article
            className="public-info-section"
            key={section.heading}
          >
            <h2>{section.heading}</h2>

            {section.paragraphs?.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ),
            )}

            {section.items?.length > 0 && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}

export default PublicInfoPage;