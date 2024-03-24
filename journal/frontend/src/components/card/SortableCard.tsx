import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PropsWithChildren } from "react";
import { Card, CardProps } from './Card';


export function SortableCard<T>({
  item, children, ...props
}: PropsWithChildren<CardProps>) {
  const sortable = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(sortable.transform),
    transition: sortable.transition
  };

  return (
    <Card item={item}
      ref={sortable.setNodeRef}
      style={style}
      {...sortable.attributes}
      {...sortable.listeners}
      {...props}>
      {children}
    </Card>
  );
}
