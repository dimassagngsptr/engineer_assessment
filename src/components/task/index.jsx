import { DateRange } from "react-date-range";
import Input from "../base/input";
import { useEffect, useState } from "react";
import NewTask from "./newTask";
import MyTask from "./myTask";
import { api } from "../../configs/api";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../configs/redux/features/userSlice";
import { toastify } from "../base/toastify";

const Task = () => {
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [completedTask, setCompletedTask] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTodo, setEditTodo] = useState({
    id: null,
    title: "",
    description: "",
  });
  const handleOpen = (id) => {
    const edited = user?.user?.todo?.find((item) => item?.ID === id);
    setEditTodo({ id, title: edited?.title, description: edited?.description });
    setOpen(!open);
  };
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e?.target?.name]: e?.target?.value });
  };
  const handleEditChange = (e) => {
    setEditTodo({ ...editTodo, [e?.target?.name]: e?.target?.value });
  };
  const handleCompleteTask = async (id, data) => {
    try {
      await api.put(`/todo/${id}`, {
        title: data?.title,
        description: data?.description,
        completed: !data?.completed,
      });
      dispatch(getProfile());
    } catch (error) {}
  };
  const handleClickEditTodo = async () => {
    try {
      const res = await api.put(`/todo/${editTodo?.id}`, editTodo);
      toastify("success", res?.data?.message);
      dispatch(getProfile());
      handleOpen();
    } catch (error) {}
  };

  const handleDeletedTask = async (id) => {
    try {
      const confrm = confirm("Are you sure you want delete this task?");
      if (confrm) {
        const res = await api.delete(`/todo/${id}`);
        toastify("success", res?.data?.message);
        dispatch(getProfile());
      } else {
        return;
      }
    } catch (error) {}
  };
  const handleAddTask = async () => {
    try {
      const res = await api.post("/todo", newTask);
      if (res?.status === 200) {
        toastify("success", res?.data?.message);
        dispatch(getProfile());
      }
    } catch (error) {
      toastify(
        "error",
        `
        limit ${error?.response?.data?.limit},
        ${error?.response?.data?.message}`
      );
    }
  };

  useEffect(() => {
    function filter() {
      const ongoingTasks = [];
      const completedTasks = [];

      user?.user?.todo?.forEach((item) => {
        if (item?.completed === true) {
          completedTasks.push(item);
        } else {
          ongoingTasks.push(item);
        }
      });

      setOnGoing(ongoingTasks);
      setCompletedTask(completedTasks);
    }

    filter();
  }, [user?.user?.todo]);

  return (
    <main className="px-10">
      <div className="w-full rounded-md p-5 flex flex-col lg:flex-row justify-between bg-white shadow-lg">
        <NewTask
          handleChange={handleChange}
          newTask={newTask}
          handleAddTask={handleAddTask}
        />
        <div className="w-1/2">
          <p className="text-center font-semibold text-lg pb-2">Your task</p>
          <MyTask
            data={onGoing}
            title={"Ongoing Task"}
            updateTask={handleCompleteTask}
            deleteTask={handleDeletedTask}
            open={open}
            handleOpen={handleOpen}
            editTodo={editTodo}
            handleEditChange={handleEditChange}
            handleClickEditTodo={handleClickEditTodo}
          />
          <MyTask
            data={completedTask}
            title={"Completed Task"}
            updateTask={handleCompleteTask}
            deleteTask={handleDeletedTask}
            open={open}
            handleOpen={handleOpen}
            editTodo={editTodo}
            handleEditChange={handleEditChange}
            handleClickEditTodo={handleClickEditTodo}
          />
        </div>
      </div>
    </main>
  );
};
export default Task;
