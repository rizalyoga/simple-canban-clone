import { getToken as token } from "../../lib/api/get-token";
import LayoutPrivatePage from "../layout/LayoutPrivatePage";
import Navbar from "../navbar/Navbar";
import CardTaskGroup from "../cards/CardTaskGroup";

const Dashboard = () => {
  return (
    <LayoutPrivatePage isSignedIn={token}>
      <Navbar />
      <section className="min-h-screen main-container">
        <div className="task-grouping-container grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <CardTaskGroup />
          <CardTaskGroup />
          <CardTaskGroup />
          <CardTaskGroup />
        </div>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
