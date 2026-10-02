import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MethodDatabaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="12" cy="5.5" rx="6.5" ry="2.75" />
      <path d="M5.5 5.5v5c0 1.52 2.91 2.75 6.5 2.75s6.5-1.23 6.5-2.75v-5" />
      <path d="M5.5 10.5v5c0 1.52 2.91 2.75 6.5 2.75s6.5-1.23 6.5-2.75v-5" />
    </BaseIcon>
  );
}

export function MethodConflictIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 18V7.5c0-1.38 1.12-2.5 2.5-2.5H9" />
      <path d="M9 5l-2-2M9 5L7 7" />
      <path d="M9 12h2.5c3.5 0 4.5-4 7.5-4" />
      <path d="M9 12h2.5c3.5 0 4.5 4 7.5 4" />
      <circle cx="19" cy="8" r="1.25" />
      <circle cx="19" cy="16" r="1.25" />
    </BaseIcon>
  );
}

export function MethodDocumentIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3.5h6l4 4V20H7z" />
      <path d="M13 3.5V8h4" />
      <path d="M9.5 12h5M9.5 15h5" />
    </BaseIcon>
  );
}

export function MethodUnknownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.8 9.3a2.5 2.5 0 1 1 3.35 2.35c-.77.32-1.15.76-1.15 1.55v.35" />
      <path d="M12 17.2h.01" />
    </BaseIcon>
  );
}

export function MethodEvidenceIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4.5" y="3.5" width="10.5" height="14" rx="1.5" />
      <path d="M7.5 7h4.5M7.5 10h4.5M7.5 13h2.5" />
      <circle cx="16.5" cy="16.5" r="3.5" />
      <path d="M19 19l2 2" />
    </BaseIcon>
  );
}

export function MethodDecisionIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 6.5h7M5 11.5h7M5 16.5h5" />
      <path d="M15 13.5l2.2 2.2L21 11.5" />
    </BaseIcon>
  );
}

export function MethodAnalyticsIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19.5V5M4 19.5h16" />
      <path d="M7 15l3-4 3 2 4-6" />
      <circle cx="7" cy="15" r=".8" fill="currentColor" stroke="none" />
      <circle cx="10" cy="11" r=".8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="13" r=".8" fill="currentColor" stroke="none" />
      <circle cx="17" cy="7" r=".8" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function MethodModelIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 17c3-7 5.5-9.5 8-9.5 2.8 0 4.2 3.2 8 3.2" />
      <path d="M4 12.5c3 1.8 5.4 2.4 7.4 1.8 2.1-.62 3.2-2.6 4.8-5.8" opacity=".45" />
      <circle cx="12" cy="7.5" r="1.2" />
    </BaseIcon>
  );
}

export function MethodNetworkIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="6" cy="12" r="2" />
      <circle cx="17.5" cy="6" r="2" />
      <circle cx="18" cy="17.5" r="2" />
      <path d="M7.8 11l7.9-4M7.9 13l8.2 3.5M17.7 8v7.5" />
    </BaseIcon>
  );
}

export function MethodCubeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.5l7 4v9l-7 4-7-4v-9z" />
      <path d="M5 7.5l7 4 7-4M12 11.5v9" />
    </BaseIcon>
  );
}

export function MethodCheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.4 12.2l2.4 2.4 4.9-5.2" />
    </BaseIcon>
  );
}
