import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arraySwap,
  rectSwappingStrategy
} from '@dnd-kit/sortable';
import { ReactNode } from "react";
import { UniquelyIdentifiable } from './Card';
import { SortableCard } from './SortableCard';

export type CardContainerProps<TItem extends UniquelyIdentifiable> = {
  items: TItem[];
  cardFront: (item: TItem) => ReactNode
  cardBack?: (item: TItem) => ReactNode
  cardMenu?: (item: TItem) => ReactNode
  onReorder?: (items: TItem[]) => void;
};

export function CardContainer<TItem extends UniquelyIdentifiable>({items, cardFront, cardBack, cardMenu, onReorder}: CardContainerProps<TItem>) {
    const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (onReorder && active.id !== over?.id) {
      const oldIndex = items.findIndex(i => i.id === active.id)
      const newIndex = items.findIndex(i => i.id === over?.id)
      const reordered = arraySwap(items, oldIndex, newIndex)

      onReorder(reordered)
    }
  };

  return (
    <section className='card-container'>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            {items.map(i => {
              return (
                <SortableCard key={i.id} item={i} menu={cardMenu && cardMenu(i)}>
                  {cardFront(i)}
                  {cardBack && cardBack(i)}
                </SortableCard>
              )
            })}
          </SortableContext>
      </DndContext>
    </section>
  );
}
