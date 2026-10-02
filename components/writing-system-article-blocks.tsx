import type {
  WritingSystemBlock,
  WritingSystemSection,
} from "@/components/writing-system-contract";

function WritingSystemBlockView({ block }: { block: WritingSystemBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "bullets":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "image":
      return (
        <figure>
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case "code":
      return (
        <pre>
          <code data-language={block.language}>{block.code}</code>
        </pre>
      );
    case "callout":
      return (
        <aside className="writing-system-article-callout">
          {block.title ? <strong>{block.title}</strong> : null}
          <p>{block.text}</p>
        </aside>
      );
  }
}

export function WritingSystemSectionBody({
  section,
}: {
  section: WritingSystemSection;
}) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets?.length ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.blocks?.map((block, index) => (
        <WritingSystemBlockView
          key={`${block.type}-${index}`}
          block={block}
        />
      ))}
    </>
  );
}
