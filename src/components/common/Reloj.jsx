import { useState, useEffect } from 'react';
import moment from 'moment';

export const Reloj = () => {
  const [hora, setHora] = useState(moment().format('LT'));

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(moment().format('LT'));
    }, 1000);

    return () => clearInterval(intervalo); 
  }, []);

  return (
      <p className='reloj'>{hora}</p>
  );
};