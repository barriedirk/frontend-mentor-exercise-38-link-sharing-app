import LinkForm from './LinkForm';

export default function Links() {
  const mockupLinks = Array.from({ length: 3 }, (_, index) => index);
  const addNewLink = () => {
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

      <div id="link-list" className="flex flex-col gap-2">
        {mockupLinks.map((value, idx) => (
          <LinkForm />
        ))}
      </div>

      <button
        className="button button--primary w-full"
        type="button"
        aria-label="Save"
        onClick={() => addNewLink()}
      >
        Save
      </button>
    </>
  );
}
