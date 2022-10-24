import RecipeList from "../../components/RecipeList";
import { useCollection } from "../../hooks/useCollection";
//styles
import "./Dashboard.css";

const Dashboard = () => {
  const { data, isPending } = useCollection("recipes", ["createdAt", "desc"]);

  return (
    <>
      {isPending && <p className="loading">Loading..</p>}
      {data && <RecipeList data={data} />}
    </>
  );
};

export default Dashboard;
