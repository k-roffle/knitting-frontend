import GoogleLogin from 'react-google-login';

const Login = (): React.ReactElement => {
  return (
    <div>
      <GoogleLogin
        clientId="요기에 client id"
        buttonText="GoogleLogin"
        onSuccess={(result) => console.log(result)}
        onFailure={(result) => console.log(result)}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default Login;
