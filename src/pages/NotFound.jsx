import React from 'react';
import img404 from '../images/404.gif';

export default function NotFound() {
  return (
    <div className="container-login d-flex align-items-center justify-content-center">
      <img src={ img404 } alt="Page Not Found" className="text-center" />
      <h1>404</h1>
      <h1>Not Found</h1>
    </div>
  );
}
