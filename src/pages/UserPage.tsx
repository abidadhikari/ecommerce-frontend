import React from "react";
import { useParams } from "react-router-dom";
import LandingLayout from "../layouts/LandingLayouts";

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <LandingLayout>
      <div>
        <h1>User Page</h1>
        <p>ID: {id}</p>
      </div>
    </LandingLayout>
  );
};

export default UserPage;
