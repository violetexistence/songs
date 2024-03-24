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
import { CardItem } from './Card';
import { SortableCard } from './SortableCard';

export type CardContainerProps = {
  items: CardItem[];
  cardFront: (item: CardItem) => ReactNode
  cardBack?: (item: CardItem) => ReactNode
  cardMenu?: (item: CardItem) => ReactNode
  onReorder?: (items: CardItem[]) => void;
};

export function CardContainer({items, cardFront, cardBack, cardMenu, onReorder}: CardContainerProps) {
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
