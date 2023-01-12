import React, { useState } from "react";
import PropTypes from "prop-types";

function PaymentForm({ setToggleTab, selectedCar }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Appeler une fonction pour envoyer les informations de paiement à l'API ici
      // Exemple : await makePayment(cardNumber, expirationDate, cvv, rentalDetails);
      setIsProcessing(false);
      // Rediriger l'utilisateur vers une page de confirmation de paiement
    } catch (err) {
      setError(err.message);
      setIsProcessing(false);
    }
  };

  return (
    <form className="h-full w-full px-4 pt-10" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-medium mb-4">Price</h1>
      <div className="flex mb-4">
        <div className="w-1/3">
          <p className="text-gray-700">Total : {new Date().getMinutes()}€</p>
        </div>
      </div>
      <h2 className="text-lg font-medium mb-4">Payment</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="card-number"
        >
          Card Number
        </label>
        <input
          className="w-full p-2 border rounded-lg"
          type="text"
          id="card-number"
          name="card-number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="expiration-date"
        >
          Expiration Date
        </label>
        <input
          className="w-full p-2 border rounded-lg"
          type="text"
          id="expiration-date"
          name="expiration-date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="cvv">
          CVV
        </label>
        <input
          className="w-full p-2 border rounded-lg"
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <button
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
          isProcessing ? "cursor-not-allowed opacity-50" : ""
        }`}
        type="submit"
        disabled={isProcessing}
        onClick={() => {
          setToggleTab("list");
          selectedCar(null);
        }}
      >
        {isProcessing ? "Processing..." : "Comfirm and pay"}
      </button>
      <a className="text-blue-500" href="https://www.amazon.fr/amazonprime">
        Get 20% off by subscribing to Amazon Prime
      </a>
    </form>
  );
}

PaymentForm.propTypes = {
  setToggleTab: PropTypes.func.isRequired,
  selectedCar: PropTypes.shape({
    id: PropTypes.number.isRequired,
    car_maker: PropTypes.string.isRequired,
    car_model: PropTypes.string.isRequired,
    location_status: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaymentForm;
