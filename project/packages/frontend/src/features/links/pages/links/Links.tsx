import clsx from 'clsx';
import LinkForm from './LinkForm';

import styles from './LinkForm.module.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { updateLinks } from '@src/services/linksApi';
import { loadingSignal } from '@src/services/loadingSignal';

import { useLinksStore } from '@src/store/useLinksStore';
import { linkFormSchema } from './schemas/link';

export default function Links() {
  const links = useLinksStore((state) => state.links);
  const addNewLink = useLinksStore((state) => state.addNewLink);
  const removeLink = useLinksStore((state) => state.removeLink);
  const updateLink = useLinksStore((state) => state.updateLink);
  const switchPosition = useLinksStore((state) => state.switchPosition);

  const prevLinksCountRef = useRef<number>(links.length);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [formValidities, setFormValidities] = useState<boolean[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (links.length > prevLinksCountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    prevLinksCountRef.current = links.length;
  }, [links.length]);

  useEffect(() => {
    setFormValidities(() =>
      links.map((link) => linkFormSchema.safeParse(link).success)
    );
  }, [links, links.length]);

  const onDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const onDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onDrop = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    switchPosition(draggedItemIndex, index);

    setDraggedItemIndex(null);
  };

  const handleValidityChange = (index: number, isValid: boolean) => {
    setFormValidities((prev) => {
      if (prev[index] === isValid) return prev;

      const updated = [...prev];

      updated[index] = isValid;

      return updated;
    });
  };

  const allFormsValid = links.length === 0 || formValidities.every(Boolean);

  const save = async () => {
    if (!allFormsValid) return;

    loadingSignal.show();

    try {
      const fetchedLinks = await updateLinks(links);

      console.log('@fetchedLinks => ', fetchedLinks);
    } catch (error) {
      console.error('Failed to save links', error);
    } finally {
      loadingSignal.hide();
    }
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
        onClick={addNewLink}
      >
        + Add new link
      </button>

      <div id="link-list" className={clsx('link-list flex flex-col gap-5')}>
        {links.map((value, index) => (
          <LinkForm
            key={value.id}
            idx={index}
            value={value}
            onDragStart={() => onDragStart(index)}
            onDragOver={(e: React.DragEvent<HTMLFormElement>) => onDragOver(e)}
            onDrop={() => onDrop(index)}
            onChange={(updated) => {
              updateLink(updated, index);
            }}
            onValidityChange={(isValid) => handleValidityChange(index, isValid)}
            onRemove={() => removeLink(index)}
          />
        ))}
      </div>
      <div
        ref={bottomRef}
        className="h-px pointer-events-none select-none"
        aria-hidden="true"
      />

      <div id="link-actions" className={clsx(styles['link-actions'], 'mt-5')}>
        <button
          className="button button--primary w-full"
          disabled={!allFormsValid}
          type="button"
          aria-label="Save"
          onClick={save}
        >
          Save
        </button>
      </div>
    </>
  );
}
