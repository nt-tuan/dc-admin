import { backendAPI } from "@/utils/httpAPI.util";
import { ApiPathConsts } from "@/commons/consts/system";

export class ImageService {
  static uploadImage = (file) => {
    return backendAPI.postFile(ApiPathConsts.UPLOAD_PRODUCT_IMAGE, file);
  };

  static deleteImage = (fileName) => {
    return backendAPI.delete(
      `${ApiPathConsts.UPLOAD_PRODUCT_IMAGE}/${encodeURIComponent(fileName)}?isImport=true`
    );
  };
}
