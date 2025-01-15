import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { completePayment } from "../../../services/subscriptions.service";

const SubscriptionCard = () => {

  const completePaymentMethod = async(id:any) => {
    try {
      const result:any = await completePayment(id, {});
        if (result.status == 200) {
           
        }
       } catch (error) {
      if (error instanceof AxiosError) {
          toast.error(error.response?.data?.responseMessage)
      }
    }
  }

  useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
      console.log(queryParams,">>> queryParams >>>>")
      const intention_order_id = queryParams.get("order");
      if(intention_order_id){
        console.log(intention_order_id,">>>>> intention order id >>>>>>>>")
        completePaymentMethod(intention_order_id)
      }
    },
  [])

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card
        style={{
          width: "300px",
          border: "none",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body className="text-center">
          <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
            Your subscription is live, and the fitness world is now your
            playground!
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", color: "#6c757d", marginTop: "10px" }}>
            Start browsing classes, exploring studios, and crushing those goals.
            Let’s make it happen!
          </Card.Text>
          <Button
            variant="dark"
            className="mt-3"
            style={{
              width: "100%",
              borderRadius: "20px",
              padding: "10px",
            }}
          >
            Home
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SubscriptionCard;