import React from 'react';
import BookingForm from '../components/BookingForm';

const EFR = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-bold mb-6">Emergency First Response (EFR)</h1>
    <p className="mb-4">Learn essential first aid and CPR skills for diving and everyday life. EFR is a prerequisite for the Rescue Diver course and a valuable certification for all divers.</p>
    <ul className="list-disc pl-6 mb-6">
      <li>1 day course</li>
      <li>CPR & first aid training</li>
      <li>International certification</li>
      <li>Professional instructors</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Course Includes</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>CPR & first aid practice</li>
      <li>PADI EFR materials</li>
      <li>Certification card</li>
      <li>Free tea, coffee, water</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">What's Next?</h2>
    <p className="mb-6">EFR is required for Rescue Diver and recommended for all divers.</p>
    <BookingForm />
  </div>
);

export default EFR;
