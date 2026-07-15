// Define the type for a single product
export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
};

// Mock data to display the UI without a database connection
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Bó hoa Hồng (Dữ liệu mẫu)',
    description: 'Một bó hoa hồng đỏ thắm, biểu tượng của tình yêu mãnh liệt. Hoàn hảo cho ngày lễ tình nhân, kỷ niệm ngày cưới, hoặc một lời tỏ tình lãng mạn.',
    price: 750000,
    image_url: 'https://i.imgur.com/mJ34W22.jpeg',
  },
  {
    id: 2,
    name: 'Bó hoa Hướng Dương (Dữ liệu mẫu)',
    description: 'Rực rỡ và tươi sáng, mang lại năng lượng tích cực và niềm vui. Thích hợp để tặng bạn bè, người thân trong ngày sinh nhật hoặc chúc mừng thành công.',
    price: 550000,
    image_url: 'https://i.imgur.com/LpA5s5y.jpeg',
  },
  {
    id: 3,
    name: 'Bó hoa Tulip Trắng (Dữ liệu mẫu)',
    description: 'Tinh khôi và thanh lịch, biểu tượng cho sự tha thứ và một khởi đầu mới. Phù hợp cho những dịp trang trọng hoặc một lời xin lỗi chân thành.',
    price: 620000,
    image_url: 'https://i.imgur.com/U2T6Y2w.jpeg',
  },
  {
    id: 4,
    name: 'Bó hoa Cẩm Chướng (Dữ liệu mẫu)',
    description: 'Ngọt ngào và đáng yêu, thể hiện sự quan tâm chân thành và lòng biết ơn. Một món quà tuyệt vời cho Ngày của Mẹ hoặc để cảm ơn ai đó.',
    price: 480000,
    image_url: 'https://i.imgur.com/vT2iYqf.jpeg',
  },
];
