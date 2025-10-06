import clsx from 'clsx';
import LinkForm from './LinkForm';

import styles from './LinkForm.module.css';
import { useState } from 'react';

const mockupLinks = Array.from({ length: 3 }, (_, index) => index + 1);

export default function Links() {
  const [links, setLinks] = useState<number[]>(mockupLinks);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDrop = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedItems = [...links];
    const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);

    updatedItems.splice(index, 0, draggedItem);

    setLinks(updatedItems);
    setDraggedItemIndex(null);
  };

  const addNewLink = () => {
    return;
  };

  const save = () => {
    return;
  };

  return (
    <>
      <h2
        id="link-heading"
        className="text-preset-2 md:text-preset-1 text-grey-900 mb-2.5"
      >
        Customize your links
      </h2>
      <p className="text-preset-3-regular text-grey-500 mb-10">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>

      <button
        className="button button--secondary w-full button--small"
        type="button"
        aria-label="+ Add new link"
        onClick={() => addNewLink()}
      >
        + Add new link
      </button>

      <div id="link-list" className={clsx('link-list flex flex-col gap-5')}>
        {links.map((value, index) => (
          <LinkForm
            key={index}
            idx={index}
            value={value}
            onDragStart={() => onDragStart(index)}
            onDragOver={(e: React.DragEvent<HTMLFormElement>) => onDragOver(e)}
            onDrop={() => onDrop(index)}
          />
        ))}
      </div>

      <div id="link-actions" className={clsx(styles['link-actions'], 'mt-5')}>
        <button
          className="button button--primary w-full"
          type="button"
          aria-label="Save"
          onClick={() => save()}
        >
          Save
        </button>
      </div>
    </>
  );
}
