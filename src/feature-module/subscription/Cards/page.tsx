import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";

const SubscriptionCard = () => {
  const navigate = useNavigate();
  const route = all_routes;

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
            Your plan is live, and the fitness world is now your
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
            onClick={() => {
              // navigate(`${route.subscriptionRedirect}`)
              navigate(`${route.subscriptionRedirect}?token=${localStorage.getItem("token") || ""}`)
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