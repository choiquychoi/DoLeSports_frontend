import React, { useState } from 'react';
import BookingGrid from './BookingGrid';
import BookingCheckout from './BookingCheckout';

const CourtBookingSection = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const handleOpenCheckout = (slots: any[], date: string, price: number) => {
    setCheckoutData({ slots, date, price });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="w-full">
      {/* Interactive Grid */}
      <section className="bg-white border-b-2 border-black">
        <div className="container mx-auto">
          <BookingGrid onContinue={handleOpenCheckout} />
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutData && (
        <BookingCheckout 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          selectedSlots={checkoutData.slots}
          selectedDate={checkoutData.date}
          totalPrice={checkoutData.price}
          onSuccess={() => {
            window.location.reload(); 
          }}
        />
      )}
    </div>
  );
};

export default CourtBookingSection;
