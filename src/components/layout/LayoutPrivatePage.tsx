import { Navigate } from "react-router-dom";

const LayoutPrivatePage = ({
  isSignedIn,
  children,
}: {
  isSignedIn: string | null;
  children: React.ReactNode;
}) => {
  if (isSignedIn) {
    return children;
  }

  return <Navigate to="/v1/login" replace />;
};

export default LayoutPrivatePage;
