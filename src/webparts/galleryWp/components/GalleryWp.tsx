import * as React from "react";
import styles from "./GalleryWp.module.scss";
import { IGalleryWpProps } from "./IGalleryWpProps";
import {
  Carousel,
  CarouselButtonsDisplay,
  CarouselButtonsLocation,
} from "@pnp/spfx-controls-react/lib/Carousel";
import "@pnp/sp/webs";
import "@pnp/sp/files/web";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { getSP } from "../PNPConfig/pnpjsConfig";

import "@pnp/sp/items/get-all";
import Filter from "./Filter";
import ImageData from "./ImageData";

export interface GalleryWpState {
  items: Array<ImageData>;
  picTag: string;
}

export default class GalleryWp extends React.Component<
  IGalleryWpProps,
  GalleryWpState,
  {}
> {
  ImgTagOnChanged: any;
  allItems: Array<ImageData>
  
  public constructor(props: IGalleryWpProps) {
    super(props);
    this.state = {
      items: [],
      picTag: "",
    };
    this.updateItems(this.state.items);
    this.getItems();
  }
  
  public render(): React.ReactElement<IGalleryWpProps> {
    const { items } = this.state;

    function filterdItems(allitems: Array<ImageData>,picTag: string): Array<ImageData> {
      if(picTag ==='')
      {
        return allitems;
      } 
      var sortedItems: Array<ImageData> = [];
      var sortedItemsSize: number = 0;
           for (var i = 0; i < allitems.length; i++) {
             if (allitems[i].description.match(picTag)) {
               sortedItems[sortedItemsSize] = allitems[i];
               sortedItemsSize = sortedItemsSize + 1;
             }
           }
           console.log(sortedItemsSize, "photos");
          return sortedItems;
  }

    const onSumbitHandler = (picTag: string) => {
      console.log("onSumbitHandler");
      console.log(this);
      this.updateItems(filterdItems(this.allItems,picTag));
    };

    return (
      <div>
        <p>
        <Filter onSumbit={onSumbitHandler} />
        </p>
        <Carousel
          buttonsLocation={CarouselButtonsLocation.top}
          buttonsDisplay={CarouselButtonsDisplay.block}
          contentContainerStyles={styles.carouselContent}
          containerButtonsStyles={styles.carouselButtonsContainer}
          isInfinite={true}
          element={items}
          onMoveNextClicked={(index: number) => {
            console.log(`Next button clicked: ${index}`);
          }}
          onMovePrevClicked={(index: number) => {
            console.log(`Prev button clicked: ${index}`);
          }}
        />
      </div>
    );
  }

  public async getItems() {
    const spCache = getSP();
    const ImportedItems = await spCache.web.lists
      .getByTitle("gallery")
      .items.getAll();
    let newItems: ImageData[] = [];
    for (var i = 0; i < ImportedItems.length; i++) {
      newItems[i] = new ImageData(ImportedItems[i].image1, ImportedItems[i].test);
      console.log(ImportedItems[i].test);
    }
    console.log(ImportedItems);
    this.allItems=newItems
    this.setState({ items: newItems });
  }

  public async updateItems(items: Array<ImageData>) {
    console.log("updated data");
    this.setState({ items: items });
  }
};

