import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { api } from "../utils/api";
import SortableItem from "../components/SortableItem";

const Home: NextPage = () => {
  const { data, isLoading, error } = api.test.getStockData.useQuery();
  const utils = api.useContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!data || error) {
    return <p>Something went wrong</p>;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      utils.test.getStockData.setData(undefined, (prev) => {
        if (!prev) return prev;

        const oldIndex = prev?.findIndex((s) => s.obj.id === active.id);
        const newIndex = prev?.findIndex((s) => s.obj.id === over?.id);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="description" content="Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <main className={styles.main}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <SortableContext
              items={data.map((o) => o.obj.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data?.map((item) => (
                  <SortableItem {...item.obj} key={item.obj.id} />
                ))}
              </ul>
            </SortableContext>
          )}
        </main>
      </DndContext>
    </>
  );
};

export default Home;
