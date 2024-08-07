'use client'
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
export default function news() {
  return (
  <>
    <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-8">
          <Link href="/news" className="text-blue-500">
            Thời sự
          </Link>
          <span className="text-gray-500">
            Thứ tư, 10/7/2024, 21:09 (GMT+7)
          </span>
        </div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Tiêu hủy xe Lamborghini và MercedesBenz AMG G63 nhập lậu
          </h1>
          <p className="mb-4">
            QUẢNG BÌNH -Siêu xe Lamborghini và Mercedes AMG G63 nhập lậu, không
            giấy tờ, bị cơ quan chức năng tiêu hủy ngày 10/7, sau 4 năm bị tạm
            giữ.
          </p>

          <div className="my-4">
            <Image
              src="/mec.jpg"
              alt="Mercedes"
              width={500}
              height={300}
              className="w-full"
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Siêu xe Lamborghini phai màu sau 4 năm bị tạm giữ. Ảnh: Công an cung
            cấp
          </p>

          <p className="text-right">
            <strong>Võ Thạnh</strong>
          </p>
        </div>
        <section className="grid md:grid-cols-2 gap-8">
          {[
            {
              src: "/lam1_accident.jpg",
              alt: "lam1_accident",
              title: "3 siêu xe bị tạm giữ",
              content:
                "Các ôtô có giá khoảng 4-16 tỷ đồng mỗi chiếc, không gắn đủ biển số, tài xế không có bằng lái, không giấy đăng ký xe... bị cảnh sát bắt giữ.",
            },
            {
              src: "/duaxe.jpg",
              alt: "duaxe",
              title:
                "Hai tài xế xe buýt rượt đuổi, giành khách trên quốc lộ bị tạm giữ",
              content:
                "Hai người lái xe buýt rượt đuổi nhau trên quốc lộ 1, đánh võng không cho phương tiện khác vượt lên... để tranh giành khách, bị cảnh sát tạm giữ.",
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="relative w-full h-0 pb-[56.25%] mb-4">
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">
                  <Link href="#" className="text-blue-500">
                    {item.title}
                  </Link>
                </h2>
                <p className="line-clamp-3">{item.content}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      </>
  )
}
