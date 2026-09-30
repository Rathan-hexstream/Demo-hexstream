import { useState } from "react";

const AccordionItem = ({ title, content, isOpen, toggle }: any) => {
  return (
    <div className="rounded">
      <div className="flex justify-between p-4 cursor-pointer" onClick={toggle}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className={isOpen ? "transform rotate-90" : ""}>&#9654;</div>
      </div>
      {isOpen && <div className="p-4 text-white">{content}</div>}
    </div>
  );
};

const Accordion = ({ items }: any) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index: any) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  return (
    <div className="space-y-2">
      {items.map(({ item, index }: any) => (
        <AccordionItem
          key={index}
          title={item?.title}
          content={item?.content}
          isOpen={openItem === index}
          toggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
