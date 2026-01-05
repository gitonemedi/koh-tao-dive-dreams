
import React from 'react';
import { Award, Users, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Award, label: t('about.stats.certifications'), value: '500+' },
    { icon: Users, label: t('about.stats.divers'), value: '2000+' },
    { icon: MapPin, label: t('about.stats.sites'), value: '25+' },
    { icon: Clock, label: t('about.stats.experience'), value: '15+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {t('about.sectionTitle')}
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              {t('about.description1')}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              {t('about.description2')}
            </p>
            <ul className="text-lg text-gray-600 space-y-2">
              {t('about.features', { returnObjects: true }).map((feature: string, index: number) => (
                <li key={index}>• {feature}</li>
              ))}
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
