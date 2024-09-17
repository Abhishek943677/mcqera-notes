import {useState, useEffect} from 'react';

export const CustomAsyncSelect = (props) => {
  const [listItems, setListItems] = useState([]);
  const {schemaType, renderDefault} = props;
  const {options} = schemaType;
  const {url, formatResponse} = options;

  useEffect(() => {
    const fetchListItems = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const formattedItems = formatResponse(json);
        setListItems(formattedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchListItems();
  }, [url, formatResponse]);

  return renderDefault({
    ...props,
    schemaType: { ...schemaType, options: { ...options, list: listItems } },
  });
};
