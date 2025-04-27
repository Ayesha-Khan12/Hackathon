import { useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateTaskModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        assignedTo,
        status: "todo",
        createdBy: auth.currentUser.email,
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleCreate}
        className="bg-gradient-to-r from-gray-600 to-gray-800 backdrop-blur-md p-6 rounded-lg flex flex-col gap-4 w-96 sm:w-80"
      >
        <h2 className="text-2xl font-bold text-black text-center">Create New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="p-3 rounded bg-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          className="p-3 rounded bg-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Assign to (email)"
          className="p-3 rounded bg-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-black"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 p-3 rounded text-white mt-4 transition-all duration-200 shadow-md hover:shadow-xl"
        >
          Create Task
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-black-400/20 p-3 rounded text-white hover:bg-red-400/30 mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateTaskModal;
