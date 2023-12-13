import { Outlet } from 'react-router-dom';
import { useThemeColors } from '../contexts/Theme.context';
import Navigation from './Navigation'

export default function Layout() {
  const { theme, textTheme } = useThemeColors();

  return (
		<div className={`container-xl bg-${theme} text-${textTheme}`}>
      <Navigation />
      <Outlet />
    </div>
  );
}