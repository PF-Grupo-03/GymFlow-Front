/* eslint-disable @typescript-eslint/no-unused-vars */
  "use client";
  import { useEffect, useState } from "react";
  import { useSearchParams, useRouter } from "next/navigation";
  import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
  import axios from "axios";
  import { useAuth } from "@/context/AuthContext";
  import { Toast } from "../Toast/Toast";
import TitleBox from "../TitleBox/TitleBox";

  export default function CustomPaymentForm() {
    const { userData } = useAuth();
    const [paymentToken, setPaymentToken] = useState("");
    const [amount, setAmount] = useState<number>(0);
    const [paymentMethodId, setPaymentMethodId] = useState("");
    const [dni, setDni] = useState(""); // Estado para capturar el DNI
    const [isProcessing, setIsProcessing] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
      initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!);
      console.log(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY)
    }, []);

    useEffect(() => {
      const queryAmount = searchParams.get("amount");
      if (queryAmount) {
        setAmount(parseFloat(queryAmount));
      } else {
        router.push("/Plans");
      }
    }, [searchParams, router]);

    const handlePayment = async (token: string) => {
      console.log("🔵 handlePayment llamado");
    
      if (isProcessing) return;
    
      if (!token) {
        Toast.fire({
          icon: "error",
          title: "Por favor, ingresa los datos de la tarjeta.",
        });
        return;
      }
    
      if (!dni) {
        Toast.fire({
          icon: "error",
          title: "Por favor, ingresa tu DNI.",
        });
        return;
      }
    
      setIsProcessing(true);
    
      const paymentData = {
        description: "Pago de Membresía",
        transactionAmount: amount,
        paymentMethodId,
        token, // Utiliza el token que pasas como argumento
        dni,
        payerEmail: userData?.user?.email || "",
      };
    
      console.log("🔵 Datos de pago enviados:", paymentData);
    
      try {
        const response = await axios.post(
          "http://localhost:3001/payment",
          paymentData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
    
        console.log("🟡 Respuesta del backend:", response);
    
        Toast.fire({ icon: "success", title: "Pago registrado exitosamente." });
      } catch (error: any) {
        console.error(
          "🔴 Error en el pago:",
          error.response?.data || error.message
        );
        Toast.fire({
          icon: "error",
          title: error.response?.data?.message || "Error en el pago",
        });
      } finally {
        setIsProcessing(false);
      }
    };  

    return (
      <div>
        <TitleBox title="Pago con tarjeta" />
        <CardPayment
          initialization={{ amount }}
          onReady={() => console.log("✅ Secure Fields ready")}
          onError={(error) => console.error("🔴 Secure Fields error:", error)}
          onSubmit={async (formData) => {
            console.log("✅ Datos del formulario:", formData); // Imprime todo el objeto formData
            if (!formData.token) {
              Toast.fire({
                icon: "error",
                title: "Por favor, ingresa los datos de la tarjeta.",
              });
              return;
            }

            // Imprimir el token para verlo en la consola
            console.log("🟢 Token obtenido:", formData.token);

            // Obtener el DNI desde formData.payer.identification.number
            const dniFromCard = formData.payer?.identification?.number || "";
            if (!dniFromCard) {
              Toast.fire({
                icon: "error",
                title: "Por favor, ingresa tu DNI.",
              });
              return;
            }

            console.log("🟡 DNI del titular:", dniFromCard); // Imprime el DNI

            // Establecer el DNI y el token en el estado
            setDni(dniFromCard);
            setPaymentToken(formData.token); // Asegúrate de actualizar el estado con el token recibido
            setPaymentMethodId(formData.payment_method_id);

            // Llamamos a handlePayment con el DNI y token correcto
            await handlePayment(formData.token); // Pasa el token directo en la llamada a handlePayment
          }}
        />
      </div>
    );
  }
