import {
  DndContext,
  DragEndEvent,
  DragOverlay,
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
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { ReactNode, useState } from "react";
import { UniquelyIdentifiable } from '../../util/UniquelyIdentifiable';
import { SortableCard } from './SortableCard';

export type CardContainerProps<TItem extends UniquelyIdentifiable> = {
  items: TItem[];
  cardFront: (item: TItem) => ReactNode
  cardBack?: (item: TItem) => ReactNode
  onReorder?: (items: TItem[]) => void;
};

export function CardContainer<TItem extends UniquelyIdentifiable>({items, cardFront, cardBack, onReorder}: CardContainerProps<TItem>) {
  const [isMoving, setMoving] = useState(false)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setMoving(true)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setMoving(false)
  };

  const handleDragOver = (event: DragEndEvent) => {
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
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            {items.map(i => {
              return (
                <SortableCard key={i.id} item={i}>
                  <div className='front'>{cardFront(i)}</div>
                  <div className='back'>{cardBack && cardBack(i)}</div>
                </SortableCard>
              )
            })}
          </SortableContext>
          <DragOverlay>
            { isMoving ? (
              <article className='card drag-overlay'>
                <ControlCameraIcon />
                <h4>Move Card</h4>
              </article>
            ) : null}
          </DragOverlay>
      </DndContext>
    </section>
  );
}
