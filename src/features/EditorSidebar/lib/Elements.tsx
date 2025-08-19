import type { FC } from 'react';
import {
  ChevronLeft,
  Circle,
  MoveDownLeft,
  Square,
  Triangle,
  Type,
} from 'lucide-react';
import { v4 as uuid4 } from 'uuid';
import {
  CanvasElementType,
  type GeometricFigure,
  selectAddCanvasElement,
  selectCanvasHeight,
  selectCanvasWidth,
  useCanvasSizesStore,
  useSlideStore,
} from '@/entities/canvas';
import { Button } from '@/shared/ui';

const FIGURES: GeometricFigure[] = [
  {
    name: 'square',
    icon: <Square size={48} />,
  },
  {
    name: 'triangle',
    icon: <Triangle size={48} />,
  },
  {
    name: 'circle',
    icon: <Circle size={48} />,
  },
  {
    name: 'move-down-left',
    icon: <MoveDownLeft size={48} />,
  },
  {
    name: 'chevron-left',
    icon: <ChevronLeft size={48} />,
  },
];

const CLIP_PATH: Record<GeometricFigure['name'], string> = {
  square: 'none',
  triangle: 'polygon(50% 0%, 100% 100%, 0% 100%)',
  circle: 'circle(50% at 50% 50%)',
  'move-down-left':
    'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%);',
  'chevron-left':
    'polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)',
};

export const Elements: FC = () => {
  const width = useCanvasSizesStore(selectCanvasWidth);
  const height = useCanvasSizesStore(selectCanvasHeight);
  const addCanvasElement = useSlideStore(selectAddCanvasElement);

  const addFigure = (figure: GeometricFigure) => {
    addCanvasElement({
      id: uuid4(),
      type: CanvasElementType.FIGURE,
      content: CLIP_PATH[figure.name],
      x: width / 2 - 100,
      y: height / 2 - 100,
      width: 200,
      height: 200,
      backgroundColor: '#000000',
    });
  };

  const addTextField = () => {
    addCanvasElement({
      id: uuid4(),
      type: CanvasElementType.TEXT,
      content: 'Текст',
      x: width / 2 - 100,
      y: height / 2 - 100,
      width: 200,
      height: 40,
      color: '#000000',
      backgroundColor: 'transparent',
    });
  };

  return (
    <div className="text-gray-400">
      <div className="font-bold">Добавить текст или фигуру</div>
      <Button
        className="mt-2 w-full bg-transparent text-white"
        variant="outline"
        onClick={addTextField}
      >
        <Type /> Добавить текст
      </Button>

      <div className="font-bold mt-6">Геометрические фигуры</div>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {FIGURES.map((figure) => (
          <div
            key={figure.name}
            className="cursor-pointer"
            onClick={() => addFigure(figure)}
          >
            {figure.icon}
          </div>
        ))}
      </div>
    </div>
  );
};
