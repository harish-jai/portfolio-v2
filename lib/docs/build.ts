import { Doc, DocType } from "./types";
import { profile } from "@/content/profile";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { educationTracks } from "@/content/education";
import { getAllWritings } from "@/content/writing";

function buildProfileDoc(): Doc {
  const textParts = [
    profile.bio,
    `Career goals: ${profile.careerGoals}`,
    `Interests: ${profile.interests.join(", ")}`,
    `Focus areas: ${profile.focus.join(", ")}`,
    `Martial arts: ${profile.martialArts}`,
    `Geography: ${profile.geography}`,
    `Sports: ${profile.sports}`,
  ];

  return {
    id: profile.id,
    type: "profile",
    title: profile.name,
    url: "/#profile",
    text: textParts.join(" "),
    tags: [...profile.interests, ...profile.focus],
    meta: {
      location: profile.location,
      email: profile.email,
      linkedin: profile.linkedin,
      github: profile.github,
    },
  };
}

function buildExperienceDocs(): Doc[] {
  return experiences.map((exp) => {
    const textParts = [
      `${exp.role} at ${exp.company}`,
      exp.team ? `Team: ${exp.team}` : "",
      exp.location ? `Location: ${exp.location}` : "",
      `Dates: ${exp.dates}`,
      exp.blurb || "",
      exp.stack.length > 0 ? `Technologies: ${exp.stack.join(", ")}` : "",
    ].filter(Boolean);

    return {
      id: exp.id,
      type: "experience",
      title: `${exp.role} at ${exp.company}`,
      url: `/experience#${exp.id}`,
      text: textParts.join(" "),
      tags: exp.tags,
      meta: {
        company: exp.company,
        role: exp.role,
        team: exp.team || "",
        location: exp.location || "",
        dates: exp.dates,
        stack: exp.stack.join(", "),
      },
    };
  });
}

function buildProjectDocs(): Doc[] {
  return projects.map((project) => {
    const textParts = [
      project.blurb,
      project.details || "",
      project.stack.length > 0 ? `Technologies: ${project.stack.join(", ")}` : "",
    ].filter(Boolean);

    return {
      id: project.id,
      type: "project",
      title: project.name,
      url: `/projects#${project.id}`,
      text: textParts.join(" "),
      tags: project.tags,
      meta: {
        stack: project.stack.join(", "),
        github: project.links?.github || "",
        demo: project.links?.demo || "",
      },
    };
  });
}

function buildCourseDocs(): Doc[] {
  const docs: Doc[] = [];

  for (const track of educationTracks) {
    for (const course of track.courses) {
      const textParts = [
        course.name,
        course.description,
        course.blurb || "",
        course.technologies && course.technologies.length > 0
          ? `Technologies: ${course.technologies.join(", ")}`
          : "",
        course.projects && course.projects.length > 0
          ? course.projects
            .map((p) => {
              const projectText = `Project: ${p.title}. ${p.description}`;
              const linksText = p.links && p.links.length > 0
                ? ` Links: ${p.links.join(", ")}`
                : "";
              return projectText + linksText;
            })
            .join(" ")
          : "",
      ].filter(Boolean);

      docs.push({
        id: course.id,
        type: "course",
        title: course.name,
        url: `/education#${course.id}`,
        text: textParts.join(" "),
        tags: course.tags,
        meta: {
          track: track.track,
          technologies: course.technologies?.join(", ") || "",
        },
      });
    }
  }

  return docs;
}

function buildWritingDocs(): Doc[] {
  const writings = getAllWritings();
  return writings.map((writing) => {
    const textParts = [
      writing.title,
      writing.excerpt,
      writing.content,
      writing.tags && writing.tags.length > 0
        ? `Tags: ${writing.tags.join(", ")}`
        : "",
    ].filter(Boolean);

    return {
      id: writing.id,
      type: "writing",
      title: writing.title,
      url: `/writing/${writing.slug}`,
      text: textParts.join(" "),
      tags: writing.tags,
      date: writing.date,
      meta: {
        slug: writing.slug,
      },
    };
  });
}

function validateDocs(docs: Doc[]): void {
  // check for duplicate IDs
  const ids = new Set<string>();
  for (const doc of docs) {
    if (ids.has(doc.id)) {
      throw new Error(`Duplicate doc ID found: ${doc.id}`);
    }
    ids.add(doc.id);
  }

  // check URL format
  for (const doc of docs) {
    if (!doc.url.startsWith("/")) {
      throw new Error(`Doc URL must start with '/': ${doc.url} (id: ${doc.id})`);
    }
  }

  // check for empty text
  for (const doc of docs) {
    if (!doc.text || doc.text.trim().length === 0) {
      throw new Error(`Doc text cannot be empty (id: ${doc.id})`);
    }
  }
}

export function getAllDocs(): Doc[] {
  const docs: Doc[] = [
    buildProfileDoc(),
    ...buildExperienceDocs(),
    ...buildProjectDocs(),
    ...buildCourseDocs(),
    ...buildWritingDocs(),
  ];

  validateDocs(docs);
  return docs;
}

export function getDocsByType(type: DocType): Doc[] {
  return getAllDocs().filter((doc) => doc.type === type);
}

export function getDocById(id: string): Doc | undefined {
  return getAllDocs().find((doc) => doc.id === id);
}

