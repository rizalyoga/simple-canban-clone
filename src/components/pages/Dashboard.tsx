import { getToken as token } from "../../lib/api/get-token";
import LayoutPrivatePage from "../layout/LayoutPrivatePage";

const Dashboard = () => {
  return (
    <LayoutPrivatePage isSignedIn={token}>
      <section className="min-h-screen flex justify-center items-center">
        <h1>Dashboard Page</h1>
      </section>
    </LayoutPrivatePage>
  );
};

export default Dashboard;
