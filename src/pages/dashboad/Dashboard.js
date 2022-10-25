import RecipeList from "../../components/RecipeList";
import { useCollection } from "../../hooks/useCollection";
import { GridLoader } from "react-spinners";
//styles
import "./Dashboard.css";

const Dashboard = () => {
  const { data, isPending } = useCollection("recipes", ["createdAt", "desc"]);

  return (
    <>
      {isPending && (
        <p className="loading">
          <GridLoader
            color={`#999`}
            loading={isPending}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </p>
      )}
      {data && <RecipeList data={data} />}
    </>
  );
};

export default Dashboard;
