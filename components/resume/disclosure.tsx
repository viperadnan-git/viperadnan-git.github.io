interface DisclosureProps {
  title: React.ReactNode;
  meta?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  /** 2 on section pages (under the page h1), 3 under a section h2 */
  level?: 2 | 3;
}

/**
 * A list row: title, right-hand meta, grey subtitle. Rows with children are native
 * <details>: no JS, and browsers open a closed row when find-in-page matches inside it.
 */
export function Disclosure({
  title,
  meta,
  subtitle,
  children,
  level = 3,
}: DisclosureProps) {
  const Heading = level === 2 ? "h2" : "h3";
  const head = (
    <>
      <span className="flex items-baseline justify-between gap-4">
        <span className="min-w-0">
          <span className={children ? "row-title" : undefined}>{title}</span>
          {children && (
            <svg
              viewBox="0 0 10 10"
              aria-hidden="true"
              className="plus ml-2 inline-block size-2.5 align-[0.05em] text-faint"
            >
              <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </span>
        {meta && (
          <span className="shrink-0 text-muted-foreground tabular-nums">
            {meta}
          </span>
        )}
      </span>
      {subtitle && (
        <span className="block text-muted-foreground">{subtitle}</span>
      )}
    </>
  );

  if (!children) {
    return (
      <div className="py-3">
        <Heading className="font-normal">{head}</Heading>
      </div>
    );
  }

  return (
    <details className="py-3">
      <summary className="row block cursor-pointer list-none">
        <Heading className="font-normal">{head}</Heading>
      </summary>
      <div className="panel-in py-4">{children}</div>
    </details>
  );
}
