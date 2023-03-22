import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import WebApi from '../../Api/WebApi';
import { useDispatch } from 'react-redux';
import {
  showToast,
  closeToast,
  setToastMessage,
} from '../../Redux/Slices/toastSlices';
import { setLoading, resetLoading } from '../../Redux/Slices/loadingSlices';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';

interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export const Users = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#00A0D2',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const dispatch = useDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(setLoading());
        const response = await WebApi.get('/');
        setUsers(response.data.users.rows);
      } catch (e) {
        dispatch(
          setToastMessage({
            message: `Unable to fetch users: ${e}`,
            type: 'error',
          }),
        );
        dispatch(showToast());
        dispatch(closeToast());
      }
      dispatch(resetLoading());
    };
    fetchUsers();
  }, []);

  return (
    <Box
      component='main'
      className='flex flex-col gap-10 h-full bg-[#F5F6F7] shadow-lg rounded-xl border border-[#CED4D6]'
    >
      <Typography className='p-5' variant={'h4'}>
        Setting
      </Typography>
      <Box className='flex justify-center'>
        <Box className='flex justify-center w-3/4'>
          <Table className='min-w-[700px]'>
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align='right'>Last Name</StyledTableCell>
                <StyledTableCell align='right'>Email</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <StyledTableRow key={`User ${user.id}`}>
                  <StyledTableCell component='th' scope='row'>
                    {user.firstname}
                  </StyledTableCell>
                  <StyledTableCell component='th' scope='row'>
                    {user.lastname}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{user.email}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};
