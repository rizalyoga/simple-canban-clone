import React, { useEffect, useState } from "react";
import { getToken as token } from "../../lib/api/get-token";
import LayoutPrivatePage from "../layout/LayoutPrivatePage";
import Navbar from "../navbar/Navbar";
import CardTaskGroup from "../cards/CardTaskGroup";
import { getTodosGroup } from "../../lib/api/todos-group/todos-group";
import { TodosGroupInterface } from "../../types/type";

const Dashboard = () => {
  const [listTodosGroup, setListTodosGroup] = useState<TodosGroupInterface[]>(
    []
  );

  useEffect(() => {
    getTodosGroup().then((response: TodosGroupInterface[]) => {
      setListTodosGroup(response);
    });
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
              <CardTaskGroup TodosGroupData={group} index={index} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
