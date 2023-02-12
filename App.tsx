import Toast from 'react-native-toast-message';
import { HomeView } from './app/views/HomeView/HomeView';

export const App = () => {
  return (
    <>
      <HomeView />
      <Toast />
    </>
  );
};
