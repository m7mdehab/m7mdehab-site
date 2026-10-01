import { presairaWordmarkPaths } from "@/components/presaira-wordmark-paths";

export function PresairaWordmark() {
  return (
    <svg
      aria-hidden="true"
      data-presaira-wordmark
      focusable="false"
      viewBox="0 0 665 88"
      preserveAspectRatio="xMidYMid meet"
    >
      {presairaWordmarkPaths.map((path, index) => (
        <path d={path} fill="#e9ecf4" fillRule="evenodd" key={index} />
      ))}
    </svg>
  );
}
