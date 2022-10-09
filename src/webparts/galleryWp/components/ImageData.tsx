import { ImageFit } from "office-ui-fabric-react"

class ImageData {
    imageSrc:string;
    title: string;
    description:any;
    url: string;
    showDetailsOnHover: boolean;
    imageFit :any;


    constructor(imagedata:any,imagedescription:any) {
     this.imageSrc= JSON.parse(imagedata).serverUrl + JSON.parse(imagedata).serverRelativeUrl;
      this.title= JSON.parse(imagedata).fileName;
      this.description= imagedescription;
      this.url= "https://knowedge.sharepoint.com/sites/kDev/KnowdegePics";
      this.showDetailsOnHover= true;
      this.imageFit = ImageFit.cover;
    }
}
export default ImageData;