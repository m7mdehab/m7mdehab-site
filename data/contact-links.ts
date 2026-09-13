import { profile } from "@/data/public";

const gmailComposeBase = "https://mail.google.com/mail/?view=cm&fs=1";

export function emailComposeHref(subject?: string) {
  const to = encodeURIComponent(profile.email);
  const subjectParam = subject ? `&su=${encodeURIComponent(subject)}` : "";
  return `${gmailComposeBase}&to=${to}${subjectParam}`;
}

export const publicContactLinks = {
  email: profile.email,
  linkedin: profile.linkedin,
  github: profile.github,
} as const;
