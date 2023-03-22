import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import WebApi from '../../Api/WebApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Redux/Slices/userSlices';
import {
  showToast,
  closeToast,
  setToastMessage,
} from '../../Redux/Slices/toastSlices';
import { setLoading, resetLoading } from '../../Redux/Slices/loadingSlices';
import { Auth } from 'aws-amplify';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
interface ISettingProps {
  signOut?: () => void;
}
export const Setting = (props: ISettingProps) => {
  const { signOut } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({
    email: '',
    firstname: '',
    lastname: '',
    id: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleSave = async () => {
    try {
      dispatch(setLoading());
      const response = await WebApi.patch('/updateUser', {
        userInfo: currentUser,
      });
      dispatch(
        setToastMessage({
          message: response.data.message,
          type: 'success',
        }),
      );
      dispatch(showToast());
      dispatch(closeToast());
      dispatch(setUser(response.data.user));
    } catch (e) {
      dispatch(
        setToastMessage({
          message: `Unable to update user: ${e}`,
          type: 'error',
        }),
      );
      dispatch(showToast());
      dispatch(closeToast());
    }
    dispatch(resetLoading());
  };
  const handleDelete = async () => {
    try {
      dispatch(setLoading());
      const response = await WebApi.delete(`/deleteUser/${currentUser.id}`);
      dispatch(
        setToastMessage({
          message: response.data.message,
          type: 'success',
        }),
      );
      dispatch(showToast());
      dispatch(closeToast());
      if (signOut) {
        setOpenDialog(false);
        await Auth.deleteUser();
        signOut();
      }
    } catch (e) {
      dispatch(
        setToastMessage({
          message: `Unable to delete user: ${e}`,
          type: 'error',
        }),
      );
      dispatch(showToast());
      dispatch(closeToast());
    }
    dispatch(resetLoading());
  };
  return (
    <Box
      component='main'
      className='flex flex-col gap-10 h-full bg-[#F5F6F7] shadow-lg rounded-xl border border-[#CED4D6]'
    >
      <Typography className='p-5' variant={'h4'}>
        Setting
      </Typography>
      <Box className='flex justify-center'>
        <Box className='w-1/3 flex flex-col items-center gap-10'>
          <FormControl fullWidth>
            <FormLabel>Email</FormLabel>
            <Input
              name='email'
              value={currentUser.email}
              placeholder='Enter email:'
              type='email'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>First Name</FormLabel>
            <Input
              name='firstname'
              value={currentUser.firstname}
              placeholder='Enter first name:'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Last Name</FormLabel>
            <Input
              name='lastname'
              value={currentUser.lastname}
              placeholder='Enter last name:'
              type='text'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
              }}
            />
          </FormControl>
          <div className='justify-between flex w-full'>
            <Button
              onClick={() => setOpenDialog(true)}
              size='large'
              variant='outlined'
              color='error'
            >
              Delete Account
            </Button>
            <Button
              onClick={() => handleSave()}
              size='large'
              variant='outlined'
            >
              Save
            </Button>
          </div>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions className='flex w-full'>
          <Button variant='outlined' onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={handleDelete}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
