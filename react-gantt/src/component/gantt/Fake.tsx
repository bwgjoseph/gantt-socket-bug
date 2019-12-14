import React from 'react';
import fApp from '../../feathers';
import { useLocation, useHistory } from 'react-router-dom';

const service = fApp.service('event');

export const Fake: React.FC = () => {

  const location = useLocation();
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePatchEvent = async () => {
    await service.patch(location.pathname.split('/')[2], {
      name: 'helloWorld' + Math.floor(Math.random() * 101)
    });
    history.goBack();
  };

  return (
    <>
      <h1>Fake Page</h1>
      <button onClick={handlePatchEvent}>Simulate edit task</button>
    </>
  );
}