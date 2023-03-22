import Drawer from '@mui/material/Drawer';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { toTitleCase } from '../../../Utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';

interface ISideNavBarProps {
  signOut?: () => void;
}

export const SideNavBar = (props: ISideNavBarProps) => {
  const user = useSelector((state: RootState) => state.user);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { signOut } = props;
  return (
    <Drawer
      className='w-[250px] flex flex-col gap-2.5'
      variant='permanent'
      anchor='left'
      PaperProps={{
        style: {
          overflowY: 'unset',
        },
      }}
    >
      <div
        className='w-[250px] flex flex-col h-full justify-between'
        style={{
          width: '250px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <NavLink
            to={'/'}
            className='cursor-pointer flex items-center justify-center w-full h-16 my-2'
          >
            <img className='object-contain h-16 w-16' src={'/logo.png'} />
          </NavLink>
          <NavLink end to={'/'}>
            {({ isActive }) => (
              <div
                className={`cursor-pointer flex items-center pl-14 w-full h-16 no-underline ${
                  isActive ? 'text-white bg-blue-400' : 'text-gray-700'
                }`}
              >
                <HomeIcon className='mr-1 h-6 w-6' />
                <Typography variant={'body1'}>Home</Typography>
              </div>
            )}
          </NavLink>
          <NavLink end to={'/users'}>
            {({ isActive }) => (
              <div
                className={`cursor-pointer flex items-center pl-14 w-full h-16 no-underline ${
                  isActive ? 'text-white bg-blue-400' : 'text-gray-700'
                }`}
              >
                <GroupIcon className='mr-1 h-6 w-6' />
                <Typography variant={'body1'}>Users</Typography>
              </div>
            )}
          </NavLink>
          <NavLink end to={'/setting'}>
            {({ isActive }) => (
              <div
                className={`cursor-pointer flex items-center pl-14 w-full h-16 no-underline ${
                  isActive ? 'text-white bg-blue-400' : 'text-gray-700'
                }`}
              >
                <SettingsIcon className='mr-1 h-6 w-6' />
                <Typography variant={'body1'}>Settings</Typography>
              </div>
            )}
          </NavLink>
        </div>
        <div className='mb-4'>
          {activeDropdown === 'account' && (
            <ClickAwayListener onClickAway={() => setActiveDropdown(null)}>
              <Collapse
                in={activeDropdown === 'account'}
                timeout='auto'
                unmountOnExit
                data-testid='avatar-dropdown-menu'
                id={'avatar-dropdown-menu'}
              >
                <div
                  className='cursor-pointer flex items-center p-5 w-full h-16 no-underline hover:text-white hover:bg-blue-400'
                  onClick={signOut}
                >
                  <LogoutIcon className='mr-1 h-6 w-6' />
                  <span>Logout</span>
                </div>
              </Collapse>
            </ClickAwayListener>
          )}
          <div
            className={`cursor-pointer flex justify-between items-center p-5 w-full h-16 no-underline hover:text-white hover:bg-blue-400 ${
              activeDropdown === 'account' && 'bg-blue-400 text-white'
            }`}
            onClick={() => setActiveDropdown('account')}
          >
            <Typography variant={'body1'} className='flex items-center'>
              <AccountCircleIcon className='mr-1 h-6 w-6' />
              {`${toTitleCase(user.firstname)} ${toTitleCase(user.lastname)}`}
            </Typography>
            {activeDropdown === 'account' ? <ExpandLess /> : <ExpandMore />}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
