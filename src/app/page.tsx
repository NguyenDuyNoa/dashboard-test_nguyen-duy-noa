import Materials from "@/component/Materials";
import Plan from "@/component/Plan";
import Progress from "@/component/Progress";
import Situation from "@/component/Situation";
import Top5 from "@/component/Top5";
import TopProduct from "@/component/TopProduct";

export default function Home() {
  return (
    <div className="py-6 flex flex-col gap-6 bg-[#FDFDFE] min-h-screen">
      <TopProduct />
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12">
        <Plan />
        <Top5 />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-12">
        <Situation />
        <Progress />
        <Materials />
      </div>
    </div>
  );
}
