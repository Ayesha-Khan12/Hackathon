import { Draggable } from "@hello-pangea/dnd";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path if needed
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
const TaskCard = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = async () => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        title: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const taskRef = doc(db, "tasks", task.id);
        await deleteDoc(taskRef);
      } catch (error) {
        console.error("Error deleting task:", error.message);
      }
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card bg-white p-4 rounded-md my-2 shadow-md ${
            snapshot.isDragging ? "scale-95" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="p-2 rounded bg-gray-100"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="p-2 rounded bg-gray-100"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  <FiEdit></FiEdit>
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  <FiTrash></FiTrash>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;