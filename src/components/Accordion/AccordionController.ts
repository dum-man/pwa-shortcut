export class AccordionController {
  private detailsElement: HTMLDetailsElement | null;
  private summaryElement: HTMLElement | null;
  private contentElement: HTMLDivElement | null;
  private animation: Animation | null;
  private isClosing: boolean;
  private isExpanding: boolean;

  constructor() {
    this.detailsElement = null;
    this.summaryElement = null;
    this.contentElement = null;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
  }

  public attachDetailsElement(node: HTMLDetailsElement | null) {
    this.detailsElement = node;
  }

  public attachSummaryElement(node: HTMLElement | null) {
    this.summaryElement = node;
  }

  public attachContentElement(node: HTMLDivElement | null) {
    this.contentElement = node;
  }

  private calculateAnimationDuration(elementHeight: number) {
    return Math.max(400, elementHeight / 2);
  }

  private onAnimationFinish(open: boolean) {
    if (!this.detailsElement) return;

    this.detailsElement.open = open;
    this.animation = null;

    this.isClosing = false;
    this.isExpanding = false;

    this.detailsElement.style.height = "";
    this.detailsElement.style.overflow = "";
  }

  private shrink() {
    if (!this.detailsElement || !this.summaryElement) return;

    this.isClosing = true;

    const startHeight = this.detailsElement.offsetHeight;
    const endHeight = this.summaryElement.offsetHeight;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.detailsElement.animate(
      {
        height: [`${startHeight}px`, `${endHeight}px`],
      },
      {
        duration: this.calculateAnimationDuration(400),
        easing: "ease-out",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => (this.isClosing = false);
  }

  private expand() {
    if (!this.summaryElement || !this.detailsElement || !this.contentElement) {
      return;
    }

    this.isExpanding = true;

    const startHeight = this.detailsElement.offsetHeight;
    const endHeight =
      this.summaryElement.offsetHeight + this.contentElement.offsetHeight;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.detailsElement.animate(
      {
        height: [`${startHeight}px`, `${endHeight}px`],
      },
      {
        duration: this.calculateAnimationDuration(endHeight),
        easing: "ease-out",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => (this.isExpanding = false);
  }

  private open() {
    if (!this.detailsElement) return;

    this.detailsElement.style.height = `${this.detailsElement.offsetHeight}px`;
    this.detailsElement.open = true;
    requestAnimationFrame(() => this.expand());
  }

  public onClick = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.preventDefault();

    if (!this.detailsElement) return;

    this.detailsElement.style.overflow = "hidden";

    if (this.isClosing || !this.detailsElement.open) {
      this.open();
    } else if (this.isExpanding || this.detailsElement.open) {
      this.shrink();
    }
  };
}
