"use client";  

import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; 

const Google = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}> 
      <GoogleContent />
    </Suspense>
  );
};

const GoogleContent = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get("token"); 
  const userId = searchParams.get("id");

  return (
    <div>
      <p>Token: {userToken}</p>
      <p>ID: {userId}</p>
    </div>
  );
};

export default Google;
