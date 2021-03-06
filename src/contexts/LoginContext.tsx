import React, { ReactNode, FC } from 'react';
import createCtx from 'helpers/context.helpers';
import useLoggedIn from 'contexts/hooks/useLoggedIn';
import useLogout from 'contexts/hooks/useLogout';

export const [useLogin, Provider] = createCtx<{
  isLoggedIn: boolean;
  logout: () => void;
}>();

type Props = {
  children: ReactNode;
};

export const LoginContextProvider: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useLoggedIn();
  const { logout } = useLogout();

  return <Provider value={{ isLoggedIn, logout }}>{children}</Provider>;
};
