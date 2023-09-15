import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import GlobalStyles from "./globalStyles";
import Landing from "./pages/Landing";
import Movie from "./pages/Movie";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Landing />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
    </>
  );
}

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
