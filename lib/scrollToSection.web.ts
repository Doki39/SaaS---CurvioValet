function getSectionElement(sectionId: string): HTMLElement | null {
  return (
    document.getElementById(sectionId) ??
    document.querySelector<HTMLElement>(`[nativeid="${sectionId}" i]`)
  );
}

function findScrollParent(element: HTMLElement): HTMLElement {
  let node: HTMLElement | null = element.parentElement;
  while (node && node !== document.body) {
    const { overflowY } = getComputedStyle(node);
    const scrollable =
      overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay";
    if (scrollable && node.scrollHeight > node.clientHeight + 1) {
      return node;
    }
    node = node.parentElement;
  }
  return (document.scrollingElement as HTMLElement | null) ?? document.documentElement;
}

function stickyHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(".landing-sticky-header");
  return header?.getBoundingClientRect().height ?? 72;
}

export function scrollToSectionOnWeb(sectionId: string): void {
  const target = getSectionElement(sectionId);
  if (!target) return;

  const scrollParent = findScrollParent(target);
  const offset = stickyHeaderOffset();
  const parentTop = scrollParent.getBoundingClientRect().top;
  const targetTop = target.getBoundingClientRect().top;
  const top = scrollParent.scrollTop + (targetTop - parentTop) - offset;

  scrollParent.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}