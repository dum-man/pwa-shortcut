import { AccordionController } from "./AccordionController";
import styles from "./styles.module.css";

interface IProps {
  summary: React.ReactNode;
  children: React.ReactNode;
}

const Accordion = ({ summary, children }: IProps) => {
  const accordionController = new AccordionController();

  return (
    <details
      className={styles["details"]}
      ref={(node) => accordionController.attachDetailsElement(node)}
    >
      <summary
        className={styles["summary"]}
        ref={(node) => accordionController.attachSummaryElement(node)}
        onClick={accordionController.onClick}
      >
        {summary}
      </summary>
      <div
        className={styles["content"]}
        ref={(node) => accordionController.attachContentElement(node)}
      >
        {children}
      </div>
    </details>
  );
};

export default Accordion;
