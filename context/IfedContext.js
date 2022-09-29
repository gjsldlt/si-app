import { createContext, useState, useEffect } from 'react';

export const IfedContext = createContext();

export const IfedProvider = ({ children }) => {
  const [username, setUsername] = useState('Hello');

  // const handleSetUsername = () => {
  //   if (user) {
  //     if (nickname) {
  //       user.set('nickname', nickname);
  //       user.save();
  //       setNickname('');
  //       router.reload();
  //     } else {
  //       console.log("Can't set empty nickname");
  //     }
  //   } else {
  //     console.log('No user');
  //   }
  // };

  // const getAssets = () => {
  //   const data = getAllAssets();
  //   setAssets(data);
  // };

  // const getAssets = async () => {
  //   try {
  //     await enableWeb3();
  //     // const query = new Moralis.Query("Assets");
  //     // const results = await query.find();
  //     if (isWeb3Enabled) {
  //       setAssets(assetsData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <IfedContext.Provider value={{ username }}>{children}</IfedContext.Provider>
  );
};
