"use client";
import React, { useEffect, useState } from "react";
import { Card, Skeleton, message } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";

interface WebsiteInfo {
  id: string;
  title: string;
  description: string;
  contactEmail: string;
}

const UserHomePage = () => {
  const [websiteInfos, setWebsiteInfos] = useState<WebsiteInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3; 

  useEffect(() => {
    fetchWebsiteInfos();
  }, []);

  const fetchWebsiteInfos = async () => {
    try {
      const res = await fetch("./api/websiteInfo");
      if (!res.ok) {
        throw new Error('Failed to fetch website info');
      }
      const data = await res.json();
      setWebsiteInfos(data.websiteInfos || []);
    } catch (error) {
      console.error('Error fetching website info:', error);
      message.error('Failed to load website information');
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - cardsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(websiteInfos.length - cardsPerPage, prevIndex + cardsPerPage)
    );
  };

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex >= websiteInfos.length - cardsPerPage;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Danh sách khóa học</h1>
        <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
          {websiteInfos.length > 0 ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex flex-wrap justify-center">
                  {websiteInfos.slice(currentIndex, currentIndex + cardsPerPage).map((info) => (
                    <Card 
                      key={info.id} 
                      className="w-80 m-2 shadow-lg rounded-xl overflow-hidden flex-shrink-0"
                    >
                      <h2 className="text-xl font-bold mb-2 text-gray-800">
                        {info.title}
                      </h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {info.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        Contact us:{" "}
                        <a
                          href={`mailto:${info.contactEmail}`}
                          className="text-blue-500 hover:underline transition duration-300"
                        >
                          {info.contactEmail}
                        </a>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-between mt-4">
                {!isFirstPage && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition duration-300 focus:outline-none"
                  >
                    <LeftCircleFilled className="w-full" /> 
                  </button>
                )}
                {!isLastPage && (
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition duration-300 focus:outline-none ml-auto"
                  >
                     <RightCircleFilled className="w-full" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No website information available.
            </p>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default UserHomePage;
