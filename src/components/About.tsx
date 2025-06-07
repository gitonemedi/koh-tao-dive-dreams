
import React from 'react';
import { Award, Users, MapPin, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, label: 'PADI Certifications', value: '500+' },
    { icon: Users, label: 'Happy Divers', value: '2000+' },
    { icon: MapPin, label: 'Dive Sites', value: '25+' },
    { icon: Clock, label: 'Years Experience', value: '15+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Koh Tao for Diving?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Known as the diving capital of Thailand, Koh Tao offers some of the world's most accessible and diverse underwater experiences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Underwater Paradise Awaits
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Koh Tao, meaning "Turtle Island," is a small island in the Gulf of Thailand renowned for its incredible diving opportunities. With warm waters year-round, excellent visibility, and abundant marine life, it's the perfect place for both beginners and experienced divers.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our crystal-clear waters host vibrant coral reefs, schools of tropical fish, whale sharks, and if you're lucky, green sea turtles. The island's compact size means short boat rides to multiple dive sites, maximizing your underwater time.
            </p>
            <ul className="text-lg text-gray-600 space-y-2">
              <li>• Water temperature: 26-29°C year-round</li>
              <li>• Visibility: 15-25 meters</li>
              <li>• Suitable for all certification levels</li>
              <li>• Marine protected areas</li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Whale shark in Koh Tao waters"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
              <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
