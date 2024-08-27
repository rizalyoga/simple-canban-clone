import { useEffect, useState } from "react";
import { getToken as token } from "../../lib/api/get-token";
import LayoutPrivatePage from "../layout/LayoutPrivatePage";
import Navbar from "../navbar/Navbar";
import CardTaskGroup from "../cards/CardTaskGroup";
import { getTodosGroup } from "../../lib/api/todos-group/todos-group";
import { moveTodosTask } from "../../lib/api/todos-task/todos-task";
import { TodosGroupInterface } from "../../types/type";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { mutate } from "swr";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [listTodosGroup, setListTodosGroup] = useState<TodosGroupInterface[]>(
    []
  );
  const [listIdGroup, setListIdGroup] = useState<number[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getTodosGroup()
      .then((response: TodosGroupInterface[]) => {
        const sortedData: TodosGroupInterface[] = response.sort(
          (a, b) => a.id - b.id
        );
        setListTodosGroup(sortedData);

        const idGroup: number[] = sortedData.map((data) => data.id);
        setListIdGroup(idGroup);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateTodosGroup = () => {
    getTodosGroup().then((response: TodosGroupInterface[]) => {
      setListTodosGroup(response);
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceGroupId = parseInt(source.droppableId);
    const destGroupId = parseInt(destination.droppableId);
    const taskId = parseInt(draggableId);

    // Optimistic update
    // setListTodosGroup((prevGroups) => {
    //   const newGroups = [...prevGroups];
    //   const sourceGroup = newGroups.find((g) => g.id === sourceGroupId);
    //   const destGroup = newGroups.find((g) => g.id === destGroupId);

    //   if (sourceGroup && destGroup) {
    //     const [movedTask] = sourceGroup.tasks.splice(source.index, 1);
    //     destGroup.tasks.splice(destination.index, 0, {
    //       ...movedTask,
    //       todo_id: destGroupId,
    //     });
    //   }

    //   return newGroups;
    // });

    // Update server
    try {
      await moveTodosTask({
        todos_group_id: sourceGroupId,
        task_id: taskId,
        target_group_todo_id: destGroupId,
        name: "",
        progress_percentage: 0,
      }).then(() => {
        mutate(`/api/todos/${sourceGroupId}/items`);
        mutate(`/api/todos/${destGroupId}/items`);
      });
    } catch (error) {
      console.error("Failed to move task:", error);
      // Revert changes if update fails
      getTodosGroup().then(setListTodosGroup);
    }
  };

  return (
    <LayoutPrivatePage isSignedIn={token}>
      <Navbar update_state={updateTodosGroup} />
      <section className="min-h-[85vh] main-container">
        {isLoading && (
          <div className="h-[80vh] flex justify-center items-center">
            <h1 className=" font-bold text-2xl text-neutral-90">
              Please wait...
            </h1>
          </div>
        )}
        {listTodosGroup.length <= 0 && (
          <div className="h-[80vh] flex justify-center items-center">
            <h1 className=" font-bold text-2xl text-neutral-90">
              You don't have data
            </h1>
          </div>
        )}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="task-grouping-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {listTodosGroup.map((group, index) => (
              <Droppable droppableId={group.id.toString()} key={group.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <CardTaskGroup
                      TodosGroupData={group}
                      index={index}
                      lisIdGroup={listIdGroup}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
