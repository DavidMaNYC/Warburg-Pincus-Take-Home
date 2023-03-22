import { Amplify } from 'aws-amplify';
import ReactDOM from 'react-dom/client';
import { App } from './Modules/App';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter } from 'react-router-dom';
import awsmobile from './aws-exports';
import store from '../src/Redux/store';
import { Provider } from 'react-redux';
import { ToastMessage, LoadingScreen } from './Components';
Amplify.configure(awsmobile);

const formFields = {
  signUp: {
    given_name: {
      placeholder: 'Enter your first name.',
      label: 'First Name',
      order: 1,
      isRequired: true,
    },
    family_name: {
      placeholder: 'Enter your last name.',
      label: 'Last Name',
      order: 2,
      isRequired: true,
    },
    email: {
      order: 3,
      isRequired: true,
    },
    password: {
      order: 4,
      isRequired: true,
    },
    confirm_password: {
      order: 5,
      isRequired: true,
    },
  },
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ToastMessage />
    <LoadingScreen />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: "url('/background.jpg')",
        backgroundSize: '100% 100%',
      }}
    >
      <Authenticator
        formFields={formFields}
        signUpAttributes={['given_name', 'family_name']}
      >
        {({ signOut, user }) => (
          <BrowserRouter>
            <App user={user} signOut={signOut} />
          </BrowserRouter>
        )}
      </Authenticator>
    </div>
  </Provider>,
);
