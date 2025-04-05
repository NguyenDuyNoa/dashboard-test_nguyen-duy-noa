interface ProgressItemProps {
  label: string;
  count: number;
  percentage: number;
}

const progressData: ProgressItemProps[] = [
  { label: "Áo sơ mi dài tay", count: 500, percentage: 25 },
  { label: "Áo sơ mi cụt tay", count: 750, percentage: 38 }, 
  { label: "Quần baggy", count: 200, percentage: 10 },
  { label: "Quần tây", count: 800, percentage: 40 },
  { label: "Đầm maxi", count: 150, percentage: 8 },
  { label: "Áo hoodie", count: 900, percentage: 45 },
  { label: "Áo khoác bomber", count: 300, percentage: 15 },
];

export default progressData; 