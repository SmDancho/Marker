import { Link } from 'react-router-dom';

export const Header = () => {
  const routes = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <header className="">
      <div className="w-[1440px] m-auto "> 
        <nav>
          <ul className="flex gap-2">
            {routes.map((route, index) => {
              return (
                <Link to={route.path}>
                  <li key={index}>{route.label}</li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
