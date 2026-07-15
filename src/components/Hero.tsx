'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative h-[80vh] min-h-[500px] w-full overflow-hidden bg-fixed">
      <Image
        src="/hero-bg.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={80}
        priority
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" /> {/* Gradient Overlay */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
        <motion.h1 
          className="font-serif text-5xl font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         Nơi Sắc Đẹp Thăng Hoa
        </motion.h1>
        <motion.p 
          className="mt-4 max-w-2xl text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Chọn Lọc Từ Những Bông Hoa Tươi Thắm Nhất, Tạo Nên Kiệt Tác Cho Khoảnh Khắc Của Bạn.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Link href="/products" className="rounded-full bg-primary px-8 py-4 text-lg font-semibold uppercase tracking-wider text-white shadow-lg transition-transform duration-300 hover:scale-105">
            Khám Phá Bộ Sưu Tập
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
