import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "../components/TaskColumn";
import Navbar from "../components/Navbar";
import CreateTaskModal from "../components/CreateTaskModal";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(fetchedTasks);
    });
    return () => unsub();
  }, []);

  // Function to handle when a task is dragged and dropped
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return; // If task is dropped outside of the list

    // Check if the task's destination is different from its source
    if (destination.droppableId === source.droppableId) return; 

    const taskRef = doc(db, "tasks", draggableId);
    await updateDoc(taskRef, {
      status: destination.droppableId, // Update task's status in Firestore
    });
  };

  // Function to filter tasks based on their status
  const filteredTasks = (status) => tasks.filter((task) => task.status === status);

  return (
    <>
      <Navbar />
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-700/80 px-4 py-2 rounded-md text-white hover:bg-gray-700/60"
        >
          + Create Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex justify-center gap-8 p-8">
          <TaskColumn title="To Do" tasks={filteredTasks("todo")} status="todo" />
          <TaskColumn title="In Progress" tasks={filteredTasks("inprogress")} status="inprogress" />
          <TaskColumn title="Done" tasks={filteredTasks("done")} status="done" />
        </div>
      </DragDropContext>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default TaskBoard;
