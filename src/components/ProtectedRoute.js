import { Route, Redirect } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = (props) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? props.children : <Redirect to="./sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute; 