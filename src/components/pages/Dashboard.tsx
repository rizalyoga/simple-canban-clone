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

  return (
    <LayoutPrivatePage isSignedIn={token}>
      <Navbar />
      <section className="min-h-screen main-container">
        <div className="task-grouping-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {listTodosGroup.map((group) => (
            <React.Fragment key={group.id}>
              <CardTaskGroup TodosGroupData={group} />
            </React.Fragment>
          ))}
        </div>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
