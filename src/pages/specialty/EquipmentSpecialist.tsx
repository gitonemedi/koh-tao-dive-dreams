import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Contact from '@/components/Contact';

export default function EquipmentSpecialist() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">PADI Equipment Specialist Specialty</h1>
          <p className="text-xl text-gray-600">
            Master scuba equipment maintenance, repair, and optimization for better diving performance.
          </p>
        </div>

        {/* Image */}
        <div className="mb-8">
          <img
            src="/images/equipment-specialist.jpg"
            alt="Scuba equipment maintenance"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Overview */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
          <p className="text-gray-700 mb-4">
            The PADI Equipment Specialist Specialty course teaches you how to properly maintain, assemble, and troubleshoot scuba diving equipment. You'll learn about different types of gear, proper care procedures, and how to optimize your equipment setup for maximum safety and performance.
          </p>
          <p className="text-gray-700">
            This course is perfect for divers who want to take control of their own equipment maintenance and understand how gear works.
          </p>
        </Card>

        {/* What You'll Learn */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Scuba equipment components and functions</li>
            <li>Proper assembly and disassembly techniques</li>
            <li>Maintenance and cleaning procedures</li>
            <li>Troubleshooting common equipment issues</li>
            <li>Equipment selection and configuration</li>
            <li>Safety checks and preventive maintenance</li>
            <li>Basic repair techniques</li>
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Minimum certification: PADI Open Water Diver</li>
            <li>Minimum age: 15 years old</li>
            <li>Access to personal scuba equipment</li>
            <li>Interest in equipment maintenance</li>
          </ul>
        </Card>

        {/* Duration & Dives */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-bold mb-4">Duration & Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Course Duration</h3>
              <p className="text-gray-700">1-2 days</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Training</h3>
              <p className="text-gray-700">Classroom and practical equipment sessions</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="mb-8 p-6 bg-blue-50">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-3xl font-bold text-blue-600 mb-2">฿3,500</div>
          <p className="text-gray-600 text-sm">Includes training and materials</p>
        </Card>

        {/* Booking Form */}
        <Card className="mb-8 p-6 bg-green-50">
          <h2 className="text-2xl font-bold mb-6">Master Your Equipment</h2>
          <p className="text-gray-700 mb-4">Take control of your diving gear. Join our equipment specialist course.</p>
          <Button size="lg" onClick={() => navigate('/booking?course=equipment-specialist')}>Book Now</Button>
        </Card>

        {/* Contact */}
        <div className="mt-12">
          <Contact />
        </div>
      </div>
    </main>
  );
}