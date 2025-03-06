import Canvas from "./Canvas";
import CanvasActions from "./actions/CanvasActions";

export default function StudentsMap() {
  return (
    <div className="space-y-4">
      <div className="mx-auto w-fit rounded-lg bg-gray-300 p-4">
        <CanvasActions />
      </div>

      <Canvas />
    </div>
  );
}
