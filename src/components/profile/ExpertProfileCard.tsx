import React from 'react';
import Image from 'next/image';

interface ExpertProfileCardProps {
  name: string;
  expertise: string;
  contribution: string;
  rating: number;
  socialHandle: string;
  profileImage: string;
  countryFlag: string;
}

const ExpertProfileCard: React.FC<ExpertProfileCardProps> = ({
  name,
  expertise,
  contribution,
  rating,
  socialHandle,
  profileImage
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-style max-w-sm mx-auto">
      <div className="relative h-64 bg-gray-100">
        <Image
          src={profileImage}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <Image
            src="/images/country-flag.png"
            alt="Country flag"
            width={20}
            height={20}
            className="rounded-full"
          />
        </div>
      </div>

      {/* Name and Expertise Section */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 text-right leading-relaxed">{expertise}</p>
      </div>

      {/* Contribution Section */}
      <div className="mx-6 mb-6">
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <h4 className="text-sm font-bold text-purple-800 text-right">مساهمته في مقدار</h4>
          </div>
          <p className="text-sm text-purple-700 text-right leading-relaxed">{contribution}</p>
        </div>
      </div>

      {/* Rating and Social Media Section */}
      <div className="px-6 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {renderStars(rating)}
        </div>
          <div className="flex items-center gap-2">
            <a 
              href={`https://linkedin.com/in/${socialHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <svg
                className="w-4 h-4 text-purple-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
      </div>
    </div>
  );
};

export default ExpertProfileCard;
