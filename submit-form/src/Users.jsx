import React from "react";
export default function User({ details }) {
    
  if (!details) {
    return <h4>Loading User Details...</h4>;
  }
  return (
    <div>
      <h2>{details.first_name}, {details.last_name}</h2>
      <p>Email: {details.email}</p>
      
    </div>
  );
}
