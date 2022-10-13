import Auth from '../Auth/Auth';

function Login({onLogin}) {
  return (
    <Auth onLogin={onLogin} />
  );
}

export default Login;