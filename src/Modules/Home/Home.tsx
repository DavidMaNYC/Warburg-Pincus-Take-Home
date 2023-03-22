import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { toTitleCase } from '../../Utils';

export const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Box
      component='main'
      className='flex flex-col gap-10 bg-[#F5F6F7] shadow-lg rounded-xl border border-[#CED4D6] h-full'
    >
      <Typography className='p-5' variant={'h5'}>
        {user
          ? `Welcome ${toTitleCase(user.firstname)} ${toTitleCase(
              user.lastname,
            )}!`
          : 'Welcome!'}
      </Typography>
      <div className=' flex flex-wrap w-full gap-5 justify-around items-center h-full'>
        <div className='flex w-2/5'>
          <Bar
            data={{
              labels: ['November', 'December', 'January', 'Febuary', 'March'],
              datasets: [
                {
                  label: 'Profits (Millions)',
                  backgroundColor: [
                    '#3e95cd',
                    '#8e5ea2',
                    '#3cba9f',
                    '#e8c3b9',
                    '#c45850',
                  ],
                  data: [2478, 3267, 4478, 5478, 6267],
                },
              ],
            }}
          />
        </div>
        <div className='flex w-2/5 h-80 justify-center'>
          <Doughnut
            data={{
              labels: ['November', 'December', 'January', 'Febuary', 'March'],
              datasets: [
                {
                  label: 'Monthly Orders (Millions)',
                  backgroundColor: [
                    '#C7B446',
                    '#CB3234',
                    '#287233',
                    '#CF3476',
                    '#434750',
                  ],
                  data: [2478, 3267, 4478, 5478, 6267],
                },
              ],
            }}
          />
        </div>
        <div className='flex w-2/5 h-80 justify-center'>
          <Pie
            data={{
              labels: ['November', 'December', 'January', 'Febuary', 'March'],
              datasets: [
                {
                  label: 'Daily Revenue (Millions)',
                  backgroundColor: [
                    '#909090',
                    '#015D52',
                    '#924E7D',
                    '#8673A1',
                    '#C1876B',
                  ],
                  data: [2478, 3267, 4478, 5478, 6267],
                },
              ],
            }}
          />
        </div>
        <div className='flex w-2/5'>
          <Line
            data={{
              labels: ['3/18', '3/19', '3/20', '3/21', '3/22'],
              datasets: [
                {
                  label: 'Daily Revenue (Millions)',
                  backgroundColor: [
                    '#CF3476',
                    '#A98307',
                    '#606E8C',
                    '#A2231D',
                    '#3F888F',
                  ],
                  data: [2478, 3267, 4478, 5478, 6267],
                },
              ],
            }}
          />
        </div>
      </div>
    </Box>
  );
};
