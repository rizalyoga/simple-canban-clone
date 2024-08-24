import React, { useEffect, useState } from "react";
import { getToken as token } from "../../lib/api/get-token";
import LayoutPrivatePage from "../layout/LayoutPrivatePage";
import Navbar from "../navbar/Navbar";
import CardTaskGroup from "../cards/CardTaskGroup";
import { getTodosGroup } from "../../lib/api/todos-group/todos-group";
import { TodosGroupInterface } from "../../types/type";

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
        <div className="task-grouping-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {listTodosGroup.map((group, index) => (
            <React.Fragment key={group.id}>
              <CardTaskGroup
                TodosGroupData={group}
                index={index}
                lisIdGroup={listIdGroup}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
