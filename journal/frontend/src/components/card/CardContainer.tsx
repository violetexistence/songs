import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
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
import { ReactNode, useState } from "react";
import { CardItem, SortableCard } from './Card';

export type CardContainerProps = {
  items: CardItem[];
  template: (item: CardItem) => ReactNode
  onReorder?: (items: CardItem[]) => void;
};

export function CardContainer({items, template, onReorder}: CardContainerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString())
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (onReorder && active.id !== over?.id) {
      const oldIndex = items.findIndex(i => i.id === active.id)
      const newIndex = items.findIndex(i => i.id === over?.id)
      const reordered = arraySwap(items, oldIndex, newIndex)

      onReorder(reordered)
    }

    setActiveId(null)
  };

  return (
    <section className='card-container'>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            {items.map(i => {
              return (
                <SortableCard key={i.id} item={i}>
                  {template(i)}
                </SortableCard>
              )
            })}
          </SortableContext>
      </DndContext>
    </section>
  );
}
