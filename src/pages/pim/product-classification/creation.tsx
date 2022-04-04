import { useDefaultGetSegments } from "@/entities/product/libs/use-get-segments";
import SegmentSelect from "@/entities/product/ui/segment-select";

const Creation = () => {
  const { data: segments } = useDefaultGetSegments();
  return <SegmentSelect segments={segments ?? []} />;
};
export default Creation;
