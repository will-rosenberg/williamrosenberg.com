import { useEffect, useState } from "react";

export default function Resume() {
  const baseWidthPx = 8.5 * 96;
  const baseHeightPx = 11 * 96;
  const [scale, setScale] = useState(1);
  const [needsScroll, setNeedsScroll] = useState(false);
  const isScaled = scale < 1;

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = window.innerWidth;
      const availableHeight = window.innerHeight;
      const widthScale = availableWidth / baseWidthPx;
      const heightScale = availableHeight / baseHeightPx;
      const shouldScale = window.matchMedia(
        "(hover: none) and (pointer: coarse)",
      ).matches;
      const shouldFitWidth = window.innerWidth < baseWidthPx;
      const nextScale = shouldScale
        ? Math.min(1, shouldFitWidth ? widthScale : heightScale)
        : 1;
      const normalizedScale = Number.isFinite(nextScale) ? nextScale : 1;
      const scaledHeight = baseHeightPx * normalizedScale;

      setScale(normalizedScale);
      setNeedsScroll(shouldScale && scaledHeight > window.innerHeight);
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [baseWidthPx, baseHeightPx]);

  return (
    <>
      <style>
        {`
          @page {
            size: 8.5in 11in;
            margin: 0in;
          }
          body {
            display: block;
            margin: 0;
            padding: 0;
            color: #000000;
            overflow: hidden;
          }
          .resume-viewport {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 0;
            box-sizing: border-box;
            overflow: auto;
          }
          .resume-scale-wrapper {
            position: static;
            overflow: visible;
          }
          .resume-container {
            width: 8.5in;
            height: 11in;
            padding: 0.5in;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            box-sizing: border-box;
            position: static;
          }
          .resume-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 100%;
            text-align: center;
            margin-bottom: 0.15in;
          }
          .resume-header > * {
            margin: 0;
          }
          .resume-header h1 {
            margin-top: 0in;
            margin-bottom: 0in;
            padding-top: 0in;
            padding-bottom: 0in;
            line-height: 1.1;
            font-size: 3.5em;
          }
          .resume-header p {
            margin-top: 0in;
            margin-bottom: 0.01in;
            padding-top: 0in;
            padding-bottom: 0in;
            line-height: 1.1;
            font-size: 1.3em;
          }
          .resume-header p + p {
            margin-top: 0in;
            margin-bottom: 0in;
            padding-top: 0in;
            padding-bottom: 0in;
            line-height: 1; 
            font-size: 1em;
          }
          .resume-body {
            display: flex;
            flex-direction: column;
            gap: 0in;
          }
          .resume-body h2 {
            margin-bottom: 0.05in;
          }
          .resume-body p {
            margin-top: 0;
            margin-bottom: 0.05in;
          }
          .resume-body ul {
            margin-top: 0;
            margin-bottom: 0;
          }
          .resume-section + .resume-section {
            margin-top: 0.06in;
          }
          .resume-experience-item + .resume-experience-item {
            margin-top: 0.1in;
          }
          a {
            text-decoration: underline;
          }
          .skills-table {
            width: 100%;
            border-collapse: collapse;
            margin-left: 0.2in;
          }
          .skills-table-row + .skills-table-row {
            // border-top: 1px solid #cccccc;
          }
          .skills-table-row td + td {
            // border-left: 1px solid #cccccc;
            padding-left: 0in;
          }
          .skills-table-row td {
            padding-top: 0in;
            padding-bottom: 0in;
          }
          ul {
            margin-left: 0in;
            padding-left: 0.3in;
          }
          li {
            line-height: 1.45;
          }
          @media print {
            body {
              overflow: visible;
            }
            .resume-viewport {
              padding: 0;
              width: auto !important;
              height: auto !important;
              display: block;
              overflow: visible !important;
            }
            .resume-scale-wrapper {
              width: 8.5in !important;
              height: 11in !important;
              position: static;
            }
            .resume-container {
              position: static;
              transform: none !important;
            }
          }
        `}
      </style>
      <div
        className="resume-viewport"
        style={{
          overflow: isScaled ? (needsScroll ? "auto" : "hidden") : "auto",
        }}
      >
        <div
          className="resume-scale-wrapper"
          style={{
            position: isScaled ? "relative" : "static",
            overflow: isScaled ? "hidden" : "visible",
            width: isScaled ? `${baseWidthPx * scale}px` : "auto",
            height: isScaled ? `${baseHeightPx * scale}px` : "auto",
          }}
        >
          <div
            className="resume-container"
            style={
              isScaled
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }
                : undefined
            }
          >
            <div className="resume-header">
              <h1>Will Rosenberg</h1>
              <p>Product-Focused Full-Stack Software Engineer – Chicago, IL</p>
              <p>
                <a
                  href="https://williamrosenberg.com?utm_source=resume"
                  target="_blank"
                  rel="noopener"
                >
                  williamrosenberg.com
                </a>{" "}
                |{" "}
                <a
                  href="https://github.com/will-rosenberg/"
                  target="_blank"
                  rel="noopener"
                >
                  github.com/will-rosenberg
                </a>{" "}
                |{" "}
                <a
                  href="https://linkedin.com/in/will-rosenberg/"
                  target="_blank"
                  rel="noopener"
                >
                  linkedin.com/in/will-rosenberg
                </a>
              </p>
            </div>
            <div className="resume-body">
              <ResumeSection title="Experience">
                <ResumeExperienceorEducationItem
                  role="Founder & Full-Stack Software Engineer"
                  company="Simple American Accent"
                  location="Chicago, IL"
                  dates="2018-Present"
                >
                  <ul>
                    <li>
                      Built and maintain a{" "}
                      <strong>client-facing full-stack web app</strong> for
                      accent feedback and training
                    </li>
                    <li>
                      Tech stack: <strong>React</strong>, <strong>Node</strong>,{" "}
                      <strong>Express</strong>, <strong>Postgres</strong>,{" "}
                      <strong>Prisma</strong>, deployed on{" "}
                      <strong>Render</strong>
                    </li>
                    <li style={{ letterSpacing: "-0.002em" }}>
                      Developed UI components and data models for audio
                      playback, transcript annotation, and quizzes
                    </li>
                    <li>
                      Iterate quickly based on client feedback, usage patterns,
                      and server logs
                    </li>
                    <li>
                      Product decisions informed by 7+ years coaching 400+
                      clients and a 200k+ audience
                    </li>
                    <li>
                      Added unit testing and accessibility checks using{" "}
                      <strong>Jest</strong> and <strong>Storybook</strong>
                    </li>
                    <li>
                      Live app demo and source code available{" "}
                      <a
                        href="https://williamrosenberg.com?utm_source=resume"
                        target="_blank"
                        rel="noopener"
                      >
                        here
                      </a>
                    </li>
                  </ul>
                </ResumeExperienceorEducationItem>
                <ResumeExperienceorEducationItem
                  role="Systems Engineer"
                  company="Boeing Commercial Airplanes"
                  location="Everett, WA"
                  dates="2015-2018"
                >
                  <ul>
                    <li>
                      <strong>
                        Led design and testing of automated controls
                      </strong>{" "}
                      for 777X airplane air conditioning system
                    </li>
                    <li style={{ letterSpacing: "-0.006em" }}>
                      Project-managed HIL test bench build (
                      <strong>1k+ signals, 50+ actuators/sensors</strong>,
                      system integration)
                    </li>
                    <li>
                      Wrote and ran validation tests, reviewed engineering
                      changes
                    </li>
                    <li style={{ letterSpacing: "-0.003em" }}>
                      Represented the system in alert/indication reviews,
                      defining data shown to pilots and maintenance
                    </li>
                    <li>
                      Developed end-to-end understanding of requirements,
                      specifications, and documentation
                    </li>
                    <li>
                      Collaborated with suppliers, developers, and
                      cross-functional teams (remote and in-person)
                    </li>
                  </ul>
                </ResumeExperienceorEducationItem>
                <ResumeExperienceorEducationItem
                  role="Engineering Internships"
                  company="Ethicon Endo-Surgery, Case New Holland, GE Aviation"
                  dates="2012-2013"
                >
                  <ul>
                    <li>
                      Developed data acquisition and control logic for a lab
                      test system using LabVIEW
                    </li>
                    <li>
                      Contributed to structured experiment planning, test
                      execution, and root-cause analysis
                    </li>
                  </ul>
                </ResumeExperienceorEducationItem>
              </ResumeSection>
              <ResumeSection title="Skills">
                <SkillsTable>
                  <SkillsTableRow
                    label="Frontend"
                    skills="React, JavaScript, TypeScript, HTML, CSS, Tailwind, Vite, shadcn"
                  />
                  <SkillsTableRow
                    label="Backend"
                    skills="Node.js, Express, PostgreSQL, Prisma, REST APIs, SQL, Auth0"
                  />
                  <SkillsTableRow
                    label="Cloud & DevOps"
                    skills="Render, Cloudflare, Vercel, AWS S3"
                  />
                  <SkillsTableRow
                    label="Testing & Tooling"
                    skills="Git, GitHub, pnpm, Jest, Storybook, Postman, Prettier, ESLint"
                  />

                  <SkillsTableRow
                    label="Languages"
                    skills="English (native), Portuguese & Spanish (near-native)"
                  />
                </SkillsTable>
              </ResumeSection>
              <ResumeSection title="Education">
                <ResumeExperienceorEducationItem
                  role="BS in Mechanical Engineering"
                  company="Iowa State University"
                  location="Ames, IA"
                  gpa="3.45/4.00"
                  dates="2010-2015"
                ></ResumeExperienceorEducationItem>
              </ResumeSection>
              <ResumeSection title="Certifications">
                <ResumeCertificationItem
                  certification="Architecture and Systems Engineering"
                  entity="MIT Professional Education"
                  dates="2017"
                />
                <ResumeCertificationItem
                  certification="Spanish - DELE C2 (Mastery/near-native)"
                  entity="Instituto Cervantes"
                  dates="2014"
                />
              </ResumeSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ResumeSection({ title = "Add Title Here", children }) {
  return (
    <div className="resume-section">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ResumeExperienceorEducationItem({
  role,
  company,
  location,
  gpa,
  dates,
  children,
}) {
  return (
    <div className="resume-experience-item">
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span>
          {role} - {company} {location ? `- ${location}` : ""}{" "}
          {gpa ? `- GPA: ${gpa}` : ""}
        </span>
        <span>{dates}</span>
      </p>
      {children}
    </div>
  );
}

function ResumeCertificationItem({ certification, entity, dates }) {
  return (
    <div className="resume-certification-item">
      <p
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <span style={{ textIndent: "3em hanging" }}>
          {certification} - {entity}
        </span>
        <span>{dates}</span>
      </p>
    </div>
  );
}

function SkillsTable({ children }) {
  return <table className="skills-table">{children}</table>;
}

function SkillsTableRow({ label, skills }) {
  return (
    <tr className="skills-table-row">
      <td>{label}:</td>
      <td>{skills}</td>
    </tr>
  );
}
