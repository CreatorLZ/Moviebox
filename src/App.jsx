import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import GlobalStyles from "./GlobalStyles";
import { lazy, Suspense } from "react";
import { Spinner } from "./components/Header";
const Landing = lazy(() => import("./pages/Landing"));
const Movie = lazy(() => import("./pages/Movie"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <Root />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spinner />}>
              <Landing />
            </Suspense>
          }
        />
        <Route
          path="/movies/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <Movie />
            </Suspense>
          }
        />
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
