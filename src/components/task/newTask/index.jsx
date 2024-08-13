import { DateRange } from "react-date-range";
import Input from "../../base/input";

const NewTask = ({ state, setState, handleChange, newTask, handleAddTask }) => {
  return (
    <div className=" w-1/3 text-black">
      <p className="text-center font-semibold text-lg pb-2">Add new task</p>
      <div className="py-5 flex flex-col gap-y-5">
        <Input
          className="p-2 border border-gray-300 outline-none rounded w-full bg-transparent "
          placeholder="Title of task"
          name="title"
          value={newTask?.title}
          onChange={(e) => handleChange(e)}
        />
        <Input
          textArea
          className="border border-gray-300 outline-none rounded min-h-32 bg-transparent p-2"
          placeholder="Description of task"
          name="description"
          value={newTask?.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        onClick={handleAddTask}
        className="outline-none border border-blue-500 w-full py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white"
      >
        Add task
      </button>
    </div>
  );
};
export default NewTask;
