import { backendAPI } from "utils/httpAPI.util";
import { ApiPathConsts } from "commons/consts/system";

export class ImageService {
  static uploadImage = async (file) => {
    const result = await backendAPI.postFile(ApiPathConsts.UPLOAD_PRODUCT_IMAGE, file);
    return result;
  };

  static deleteImage = async (fileName) => {
    const result = await backendAPI.delete(
      `${ApiPathConsts.UPLOAD_PRODUCT_IMAGE}/${encodeURIComponent(fileName)}?isImport=true`
    );
    return result;
  };
}
