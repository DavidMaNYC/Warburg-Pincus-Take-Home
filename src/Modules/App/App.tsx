import { Routes, Route } from 'react-router-dom';
import { Home, Setting, Users } from '../';
import { AppLayout } from '../../Components';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import './App.css';
import { AmplifyUser } from '@aws-amplify/ui';
import { useEffect } from 'react';
import WebApi from '../../Api/WebApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlices';
import { setLoading, resetLoading } from '../../Redux/Slices/loadingSlices';

interface IAppProps {
  user: AmplifyUser | undefined;
  signOut?: () => void;
}
export function App(props: IAppProps) {
  const { user, signOut } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async (user: AmplifyUser) => {
      dispatch(setLoading());
      const response = await WebApi.post('/createUser', {
        userInfo: user.attributes,
      });

      dispatch(setUser(response.data.user));
      dispatch(resetLoading());
    };
    if (user) {
      fetchUser(user);
    }
  }, [user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppLayout signOut={signOut}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/setting' element={<Setting signOut={signOut} />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </AppLayout>
    </Box>
  );
}

export default App;
