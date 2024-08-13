import Dialog from "../../base/dialog";
import Input from "../../base/input";

const MyTask = ({
  data,
  title,
  updateTask,
  deleteTask,
  open,
  handleOpen,
  editTodo,
  handleEditChange,
  handleClickEditTodo,
}) => {
  return (
    <>
      <div className="mt-2">
        <p className="text-start font-semibold text-sm pb-2">{title}</p>
        {data?.map((item) => (
          <div
            key={item?.ID}
            className="px-3 py-4 bg-gray-200 flex justify-between w-full mt-2 rounded-md"
          >
            <div>
              <p
                className={`${
                  item?.completed ? "line-through" : ""
                } font-semibold`}
              >
                {item?.title}
              </p>
              <small className="text-xs block">{item?.description}</small>
            </div>
            <div className="flex gap-x-3 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 cursor-pointer"
                onClick={() => handleOpen(item?.ID)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 cursor-pointer"
                onClick={() => deleteTask(item?.ID)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <div
                className="relative bg-white border border-gray-500 rounded-full"
                onClick={() => updateTask(item?.ID, item)}
              >
                <Input
                  type="checkbox"
                  className="rounded-full opacity-0 w-5 h-5 cursor-pointer z-10"
                />
                {item?.completed && (
                  <span className="absolute bg-blue-500 h-5 w-5 rounded-full top-0 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#ffff"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog
        title={"Edit todo"}
        isOpen={open}
        onClose={handleOpen}
        btnTitle={"Submit"}
        onSubmit={handleClickEditTodo}
      >
        <div className="py-5 flex flex-col gap-y-5 w-[400px]">
          <Input
            className="p-2 border border-gray-300 outline-none rounded w-full bg-transparent "
            placeholder="Title of task"
            name="title"
            value={editTodo?.title}
            onChange={(e) => handleEditChange(e)}
          />
          <Input
            textArea
            className="border border-gray-300 outline-none rounded min-h-32 bg-transparent p-2"
            placeholder="Description of task"
            name="description"
            value={editTodo?.description}
            onChange={(e) => handleEditChange(e)}
          />
        </div>
      </Dialog>
    </>
  );
};
export default MyTask;
