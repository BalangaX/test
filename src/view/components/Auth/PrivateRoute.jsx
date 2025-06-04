import RequireAuth from '../Common/RequireAuth';

const PrivateRoute = ({ children }) => <RequireAuth>{children}</RequireAuth>;

export default PrivateRoute;
