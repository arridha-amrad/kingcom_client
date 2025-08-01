import { ChevronRight } from "lucide-react";
import BrandOptions from "./BrandOptionsFilter";
import ColorOptions from "./ColorOptions";
import PriceOptions from "./PriceOptions";

function ProductFilter() {
  return (
    <section
      id="products-filter"
      className="w-full h-max md:flex flex-col gap-4 p-6 shrink-0 border border-foreground/20 rounded-3xl"
    >
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Filter</h1>
        <button>
          <svg
            width="22"
            height="19"
            viewBox="0 0 22 19"
            className="fill-foreground"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.125 9.125V17.75C12.125 18.0484 12.0065 18.3345 11.7955 18.5455C11.5845 18.7565 11.2984 18.875 11 18.875C10.7016 18.875 10.4155 18.7565 10.2045 18.5455C9.99353 18.3345 9.875 18.0484 9.875 17.75V9.125C9.875 8.82663 9.99353 8.54048 10.2045 8.3295C10.4155 8.11853 10.7016 8 11 8C11.2984 8 11.5845 8.11853 11.7955 8.3295C12.0065 8.54048 12.125 8.82663 12.125 9.125ZM17.75 15.5C17.4516 15.5 17.1655 15.6185 16.9545 15.8295C16.7435 16.0405 16.625 16.3266 16.625 16.625V17.75C16.625 18.0484 16.7435 18.3345 16.9545 18.5455C17.1655 18.7565 17.4516 18.875 17.75 18.875C18.0484 18.875 18.3345 18.7565 18.5455 18.5455C18.7565 18.3345 18.875 18.0484 18.875 17.75V16.625C18.875 16.3266 18.7565 16.0405 18.5455 15.8295C18.3345 15.6185 18.0484 15.5 17.75 15.5ZM20 11.75H18.875V1.25C18.875 0.951631 18.7565 0.665483 18.5455 0.454505C18.3345 0.243526 18.0484 0.125 17.75 0.125C17.4516 0.125 17.1655 0.243526 16.9545 0.454505C16.7435 0.665483 16.625 0.951631 16.625 1.25V11.75H15.5C15.2016 11.75 14.9155 11.8685 14.7045 12.0795C14.4935 12.2905 14.375 12.5766 14.375 12.875C14.375 13.1734 14.4935 13.4595 14.7045 13.6705C14.9155 13.8815 15.2016 14 15.5 14H20C20.2984 14 20.5845 13.8815 20.7955 13.6705C21.0065 13.4595 21.125 13.1734 21.125 12.875C21.125 12.5766 21.0065 12.2905 20.7955 12.0795C20.5845 11.8685 20.2984 11.75 20 11.75ZM4.25 12.5C3.95163 12.5 3.66548 12.6185 3.4545 12.8295C3.24353 13.0405 3.125 13.3266 3.125 13.625V17.75C3.125 18.0484 3.24353 18.3345 3.4545 18.5455C3.66548 18.7565 3.95163 18.875 4.25 18.875C4.54837 18.875 4.83452 18.7565 5.0455 18.5455C5.25647 18.3345 5.375 18.0484 5.375 17.75V13.625C5.375 13.3266 5.25647 13.0405 5.0455 12.8295C4.83452 12.6185 4.54837 12.5 4.25 12.5ZM6.5 8.75H5.375V1.25C5.375 0.951631 5.25647 0.665483 5.0455 0.454505C4.83452 0.243526 4.54837 0.125 4.25 0.125C3.95163 0.125 3.66548 0.243526 3.4545 0.454505C3.24353 0.665483 3.125 0.951631 3.125 1.25V8.75H2C1.70163 8.75 1.41548 8.86853 1.2045 9.0795C0.993526 9.29048 0.875 9.57663 0.875 9.875C0.875 10.1734 0.993526 10.4595 1.2045 10.6705C1.41548 10.8815 1.70163 11 2 11H6.5C6.79837 11 7.08452 10.8815 7.2955 10.6705C7.50647 10.4595 7.625 10.1734 7.625 9.875C7.625 9.57663 7.50647 9.29048 7.2955 9.0795C7.08452 8.86853 6.79837 8.75 6.5 8.75ZM13.25 4.25H12.125V1.25C12.125 0.951631 12.0065 0.665483 11.7955 0.454505C11.5845 0.243526 11.2984 0.125 11 0.125C10.7016 0.125 10.4155 0.243526 10.2045 0.454505C9.99353 0.665483 9.875 0.951631 9.875 1.25V4.25H8.75C8.45163 4.25 8.16548 4.36853 7.9545 4.5795C7.74353 4.79048 7.625 5.07663 7.625 5.375C7.625 5.67337 7.74353 5.95952 7.9545 6.1705C8.16548 6.38147 8.45163 6.5 8.75 6.5H13.25C13.5484 6.5 13.8345 6.38147 14.0455 6.1705C14.2565 5.95952 14.375 5.67337 14.375 5.375C14.375 5.07663 14.2565 4.79048 14.0455 4.5795C13.8345 4.36853 13.5484 4.25 13.25 4.25Z" />
          </svg>
        </button>
      </div>
      <hr className="border-foreground/20 my-4" />
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1>Mother Board</h1>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center">
          <h1>Graphic Card</h1>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center">
          <h1>Processor</h1>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center">
          <h1>PSU</h1>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center">
          <h1>SSD</h1>
          <ChevronRight />
        </div>
        <div className="flex justify-between items-center">
          <h1>Monitor</h1>
          <ChevronRight />
        </div>
      </div>
      <hr className="border-foreground/20 my-4" />
      <PriceOptions />
      <hr className="border-foreground/20 my-4" />
      <ColorOptions />
      <hr className="border-foreground/20 my-4" />
      <BrandOptions />
      <button className="h-12 my-4 bg-foreground rounded-full w-full text-background">
        Apply Filter
      </button>
    </section>
  );
}

export default ProductFilter;
