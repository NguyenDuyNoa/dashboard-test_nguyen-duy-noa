interface Material {
  id: number;
  name: string;
  code: string;
  unit: string;
  quantity: number;
}

const materialsData: Material[] = [
  {
    id: 1,
    name: "Chỉ cotton",
    code: "NVL_000014",
    unit: "Cuộn",
    quantity: 8,
  },
  { id: 2, name: "Vải lụa", code: "NVL_000024", unit: "Mét", quantity: 8 },
  { id: 3, name: "Vải lót", code: "NVL_000024", unit: "Mét", quantity: 8 },
  {
    id: 4,
    name: "Vải chống thấm",
    code: "NVL_000024",
    unit: "Mét",
    quantity: 8,
  },
  { id: 5, name: "Vải nỉ", code: "NVL_000024", unit: "Mét", quantity: 8 },
];

export default materialsData;
