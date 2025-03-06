import Konva from "konva";

export function handleZoom(
  e: Konva.KonvaEventObject<WheelEvent>,
  stage: Konva.Stage,
  scaleBy: number,
) {
  e.evt.preventDefault();

  const oldScale = stage.scaleX();
  const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

  const pointer = stage.getPointerPosition();
  if (!pointer) return;

  const mousePointTo = {
    x: pointer.x / oldScale - stage.x() / oldScale,
    y: pointer.y / oldScale - stage.y() / oldScale,
  };

  stage.scale({ x: newScale, y: newScale });

  const newPos = {
    x: -(mousePointTo.x - pointer.x / newScale) * newScale,
    y: -(mousePointTo.y - pointer.y / newScale) * newScale,
  };

  stage.position(newPos);
  stage.batchDraw();
}

export function handleZoomReset(stage: Konva.Stage) {
  stage.scale({ x: 1, y: 1 });
  stage.position({ x: 0, y: 0 });
  stage.batchDraw();
}
