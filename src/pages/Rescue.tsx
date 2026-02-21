import React from 'react';
import BookingForm from '../components/BookingForm';

const Rescue = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-bold mb-6">PADI Rescue Diver Course</h1>
    <p className="mb-4">Become a more confident diver by learning how to prevent and manage diving emergencies. The Rescue course is challenging, rewarding, and a must for all serious divers.</p>
    <ul className="list-disc pl-6 mb-6">
      <li>3 days, pool & open water</li>
      <li>Emergency scenarios</li>
      <li>All equipment included</li>
      <li>Prerequisite: EFR</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Course Includes</h2>
    <ul className="list-disc pl-6 mb-6">
      <li>Rescue skills practice</li>
      <li>PADI Rescue materials</li>
      <li>Certification card</li>
      <li>Free tea, coffee, water</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">What's Next?</h2>
    <p className="mb-6">Rescue Diver is a prerequisite for Divemaster and recommended for all divers.</p>
    <BookingForm />
  </div>
);

export default Rescue;
