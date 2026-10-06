import JsonView, { type CopiedSectionElement, type SectionElement } from '@uiw/react-json-view';

const span: SectionElement = { as: 'span', className: 'section' };
const svg: SectionElement<'svg'> = {
  as: 'svg',
  viewBox: '0 0 16 16',
  render: (props: SectionElement<'svg'>) => <svg {...props} />,
};

const copied: CopiedSectionElement = {
  ...svg,
  beforeCopy: (copyText, keyName, value, parentValue, expandKey, keys) => {
    const args: [
      string,
      string | number | undefined,
      object | undefined,
      object | undefined,
      string | undefined,
      (string | number)[] | undefined,
    ] = [copyText, keyName, value, parentValue, expandKey, keys];
    return JSON.stringify(args);
  },
};

const button: CopiedSectionElement<'button'> = { as: 'button', disabled: true };

const invalidCopy: CopiedSectionElement = {
  // @ts-expect-error beforeCopy must return the text to copy.
  beforeCopy: () => 123,
};

const invalidButton: SectionElement<'button'> = {
  // @ts-expect-error The element type parameter determines its props.
  href: '/example',
};

<JsonView value={{ message: 'hello' }}>
  <JsonView.Row {...span} />
  <JsonView.Copied {...copied} />
  <JsonView.Copied<'button'> {...button} />
</JsonView>;
