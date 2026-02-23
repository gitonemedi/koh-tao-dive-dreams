import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function BoatDiver() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Boat Diver Specialty</h1>
          <p className="text-xl text-gray-600">
            Master boat diving techniques and safety procedures for comfortable and confident boat-based diving.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/photo-1647825194145-2d94e259c745.avif"
            alt="Boat diving scene"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Boat Diver Specialty course teaches you everything you need to know about diving from boats safely and efficiently. Learn proper boat diving etiquette, equipment handling, entry and exit techniques, and emergency procedures specific to boat diving environments.
          </p>
          <p className="text-gray-700">
            This course is essential for divers who frequently dive from boats and want to maximize their comfort and safety on the water.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Boat diving safety and etiquette</li>
            <li>Proper equipment handling on boats</li>
            <li>Entry and exit techniques (giant stride, back roll, etc.)</li>
            <li>Communication with boat crew</li>
            <li>Emergency procedures for boat diving</li>
            <li>Navigation and orientation from boats</li>
            <li>Weather and sea condition awareness</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 12 years old</li>
            <li>Good swimming skills</li>
            <li>Comfortable in open water</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training Dives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1 day</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training Dives</h3>
              <p className="text-gray-700">2 boat dives</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,000</div>
          <p className="text-gray-600 text-sm">Includes training, materials, and 2 boat dives</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Master Boat Diving</h2>
          <p className="text-gray-700 mb-4">Become a confident boat diver. Join our boat diver specialty course.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=boat-diver')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}