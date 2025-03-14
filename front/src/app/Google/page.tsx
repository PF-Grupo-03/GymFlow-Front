"use client";

import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { NEXT_PUBLIC_API_URL } from "../config/envs";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

const Google = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <GoogleContent />
    </Suspense>
  );
};

const GoogleContent = () => {
  const searchParams = useSearchParams();
  const userToken = searchParams.get("token");
  const userId = searchParams.get("id");
  const { setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId || !userToken) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setUserData({
          user: response.data,
          token: {
            withoutPasswordAndRole: response.data,
            token: userToken,
          },
        });

        router.push("/");
      } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
      }
    };

    fetchUserData();
  }, [userId, userToken, setUserData, router]);

  return <Spinner />;
};

const Spinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <ClipLoader color="#FF7700" size={50} />
  </div>
);

export default Google;
