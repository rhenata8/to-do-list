import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const ProgressBar = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.status === 'done').length;
  const totalTasks = tasks.length;

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Progress',
        data: [completedTasks, totalTasks - completedTasks],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default ProgressBar;
