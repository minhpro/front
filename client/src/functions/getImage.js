import * as Contant from "assets/contants/";

class GetImage {
  getSvg = (icon) => {
    const url = `${Contant.urlIcons}` + icon + ".svg";
    return url;
  };
  getPng = (icon) => {
    const url = `${Contant.urlIcons}` + icon + ".png";
    return url;
  };
  getJpeg = (icon) => {
    const url = `${Contant.urlIcons}` + icon + ".jpeg";
    return url;
  };
}

const getImage = new GetImage();

export default getImage;
