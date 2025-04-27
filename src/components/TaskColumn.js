import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, status }) => {
  return (
    <div className="task-column w-full sm:w-80 md:w-96 lg:w-1/4 bg-gradient-to-r from-gray-400 to-gray-600 backdrop-blur-md p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "rgba(255, 255, 255, 0.1)", // Light gray with opacity
              padding: "10px",
              borderRadius: "8px",
              minHeight: "200px",
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
