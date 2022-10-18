import RecipeList from "../../components/RecipeList";
import { useCollection } from "../../hooks/useCollection";
//styles
import "./Dashboard.css";

const Dashboard = () => {
  const { data } = useCollection("recipes");

  return <>{data && <RecipeList data={data} />}</>;
};

export default Dashboard;
