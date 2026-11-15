import type { ScrollView } from "react-native";

type LandingScrollBridge = {
  getScrollView: () => ScrollView | null;
  getSectionY: (id: string) => number | undefined;
  getHeaderOffset: () => number;
  getScrollInset: (sectionId: string) => number;
};

let bridge: LandingScrollBridge | null = null;

export function setLandingScrollBridge(next: LandingScrollBridge | null) {
  bridge = next;
}

function getSectionElement(sectionId: string): HTMLElement | null {
  return (
    document.getElementById(sectionId) ??
    document.querySelector<HTMLElement>(`[nativeid="${sectionId}" i]`)
  );
}

function pickLargestScrollable(
  root: HTMLElement,
  options?: { mustContain?: HTMLElement }
): HTMLElement | null {
  const candidates = [root, ...Array.from(root.querySelectorAll<HTMLElement>("div"))];
  let best: HTMLElement | null = null;
  let bestScrollHeight = 0;

  for (const el of candidates) {
    const { overflowY } = getComputedStyle(el);
    if (overflowY !== "auto" && overflowY !== "scroll" && overflowY !== "overlay") continue;
    if (el.scrollHeight <= el.clientHeight + 1) continue;
    if (options?.mustContain && !el.contains(options.mustContain)) continue;
    if (el.scrollHeight > bestScrollHeight) {
      best = el;
      bestScrollHeight = el.scrollHeight;
    }
  }

  return best;
}

function findLandingScrollContainer(target: HTMLElement): HTMLElement | null {
  const landingRoot = document.querySelector<HTMLElement>(".landing-main-scroll");
  if (!landingRoot) return null;
  return pickLargestScrollable(landingRoot, { mustContain: target });
}

function findMainLandingScroller(): HTMLElement | null {
  const landingRoot = document.querySelector<HTMLElement>(".landing-main-scroll");
  if (!landingRoot) return null;
  return pickLargestScrollable(landingRoot);
}

function scrollableNode(scrollView: ScrollView): HTMLElement | null {
  const extended = scrollView as ScrollView & { getScrollableNode?: () => HTMLElement };
  return extended.getScrollableNode?.() ?? null;
}

function scrollLandingY(y: number, animated: boolean) {
  const scrollView = bridge?.getScrollView();
  const top = Math.max(0, y);

  if (scrollView) {
    scrollView.scrollTo({ y: top, animated });
    const node = scrollableNode(scrollView);
    if (node) {
      requestAnimationFrame(() => {
        node.scrollTop = top;
      });
    }
    return;
  }

  const el = findMainLandingScroller();
  if (el) el.scrollTop = top;
}

function stickyHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(".landing-sticky-header");
  return header?.getBoundingClientRect().height ?? 72;
}

function scrollViaDom(sectionId: string) {
  const target = getSectionElement(sectionId);
  if (!target) return;

  const scrollEl = findLandingScrollContainer(target);
  if (!scrollEl) return;

  const offset = stickyHeaderOffset();
  const inset = bridge?.getScrollInset(sectionId) ?? 0;
  const targetTop = target.getBoundingClientRect().top;
  const viewportTop = scrollEl.getBoundingClientRect().top;
  const top = scrollEl.scrollTop + (targetTop - viewportTop) - offset + inset;

  scrollEl.scrollTop = Math.max(0, top);
}

function scrollViaScrollView(sectionId: string): boolean {
  const scrollView = bridge?.getScrollView();
  const y = bridge?.getSectionY(sectionId);
  const header = bridge?.getHeaderOffset() ?? stickyHeaderOffset();
  const inset = bridge?.getScrollInset(sectionId) ?? 0;

  if (!scrollView || y === undefined) return false;

  const targetY = Math.max(0, y - header + inset);
  scrollLandingY(targetY, true);
  return true;
}

export function scrollToLandingTop(): void {
  scrollLandingY(0, true);
}

export function scrollToSection(sectionId: string): void {
  if (scrollViaScrollView(sectionId)) return;

  scrollViaDom(sectionId);

  requestAnimationFrame(() => {
    if (!scrollViaScrollView(sectionId)) scrollViaDom(sectionId);
  });
}