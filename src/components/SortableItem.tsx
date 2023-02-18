import { CSS } from "@dnd-kit/utilities";
import styles from "../pages/index.module.css";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  id: string;
  name: string;
};

export default ({ id, name }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li ref={setNodeRef} style={style} className={styles.list_item} key={id}>
      <p {...attributes} {...listeners}>
        {name}
      </p>
    </li>
  );
};
