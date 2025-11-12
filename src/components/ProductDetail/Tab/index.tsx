import { cn } from '@/utils';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Fragment } from 'react';
import FAQS from './FAQs';
import Reviews from './Reviews';
import Specifications from './Specifications';
import Description from './Descriptions';
import Video from './Video';
import type { Product } from '@/models/product.model';

const tabs = [
  'Descriptions',
  'Specifications',
  'Videos',
  'Rating & Reviews',
  'FAQs',
];

type Props = {
  product: Product;
};

function ProductDetailTabs({
  product: { name, description, videoUrl, specification },
}: Props) {
  return (
    <TabGroup className="w-full mx-auto">
      <TabList className="flex w-full h-12 gap-4 sm:gap-0 items-center border-b border-foreground/20">
        {tabs.map((t, i) => (
          <Tab key={i} as={Fragment}>
            {({ selected }) => (
              <button className="flex-1 relative cursor-pointer outline-0 h-full flex items-center justify-center">
                <span
                  title={t}
                  className={cn(
                    'line-clamp-1',
                    selected ? 'text-foreground' : 'text-foreground/50',
                  )}
                >
                  {t}
                </span>
                {selected && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 w-full bg-foreground" />
                )}
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Description name={name} description={description} />
        </TabPanel>
        <TabPanel>
          <Specifications name={name} specs={specification ?? ''} />
        </TabPanel>
        <TabPanel>
          <Video name={name} videoUrl={videoUrl} />
        </TabPanel>
        <TabPanel>
          <Reviews />
        </TabPanel>
        <TabPanel>
          <FAQS />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

export default ProductDetailTabs;
