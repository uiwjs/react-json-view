import { useEffect } from 'react';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import JsonView from './';
import { Provider, useDispatch, useDispatchStore } from './store';
import { useExpandsDispatch } from './store/Expands';
import { useSectionDispatch } from './store/Section';
import { useShowToolsDispatch } from './store/ShowTools';
import { useSymbolsDispatch } from './store/Symbols';
import { useTypesDispatch } from './store/Types';
import { CountInfoComp } from './section/CountInfo';
import { CountInfoExtraComps } from './section/CountInfoExtra';
import { Arrow as ArrowMark, BracketsClose, BracketsOpen, Colon, Quote, ValueQuote } from './symbol';
import { bigIntToString, TypeDate, TypeString } from './types';

const rich = {
  str: 'hello',
  int: 1,
  float: 1.5,
  boolT: true,
  boolF: false,
  nil: null as null,
  undef: undefined as undefined,
  nan: NaN,
  date: new Date('2020-01-01T00:00:00.000Z'),
  url: new URL('https://example.com'),
  bi: BigInt(10),
  set: new Set(['read']),
  map: new Map([['role', 'admin']]),
  arr: [1],
  empty: {},
};

function ClearStores() {
  const symbolsDispatch = useSymbolsDispatch();
  const typesDispatch = useTypesDispatch();
  const sectionDispatch = useSectionDispatch();
  useEffect(() => {
    symbolsDispatch({
      Arrow: undefined,
      Colon: undefined,
      Quote: undefined,
      ValueQuote: undefined,
      BracketsRight: undefined,
      BracketsLeft: undefined,
      BraceRight: undefined,
      BraceLeft: undefined,
    });
    typesDispatch({
      Url: undefined,
      Str: undefined,
      Undefined: undefined,
      Null: undefined,
      True: undefined,
      False: undefined,
      Date: undefined,
      Float: undefined,
      Set: undefined,
      Int: undefined,
      Map: undefined,
      Nan: undefined,
      Bigint: undefined,
    });
    sectionDispatch({
      Copied: undefined,
      CountInfo: undefined,
      CountInfoExtra: undefined,
      Ellipsis: undefined,
      Row: undefined,
      KeyName: undefined,
    });
  }, [sectionDispatch, symbolsDispatch, typesDispatch]);
  return null;
}

it('renders when section, symbol, and type slots are cleared', async () => {
  render(
    <JsonView value={rich}>
      <JsonView.Arrow />
      <JsonView.Colon />
      <JsonView.Quote />
      <JsonView.ValueQuote />
      <JsonView.BraceLeft />
      <JsonView.BraceRight />
      <JsonView.BracketsLeft />
      <JsonView.BracketsRight />
      <JsonView.Bigint />
      <JsonView.Date />
      <JsonView.False />
      <JsonView.Float />
      <JsonView.Int />
      <JsonView.Map />
      <JsonView.Nan />
      <JsonView.Null />
      <JsonView.Set />
      <JsonView.String />
      <JsonView.True />
      <JsonView.Undefined />
      <JsonView.Url />
      <JsonView.Copied />
      <JsonView.CountInfo />
      <JsonView.CountInfoExtra />
      <JsonView.Ellipsis />
      <JsonView.KeyName />
      <JsonView.Row />
      <Quote data-testid="quote-bare" />
      <Quote data-testid="quote-named" keyName="k" />
      <Quote data-testid="quote-blank"> </Quote>
      <Quote data-testid="quote-num">{1}</Quote>
      <ValueQuote data-testid="value-quote" />
      <Colon data-testid="colon-bare" />
      <Colon data-testid="colon-named" keyName="k" />
      <ArrowMark data-testid="arrow-bare" expandKey="missing" />
      <ArrowMark data-testid="arrow-named" expandKey="missing" keyName="k" />
      <BracketsOpen data-testid="brace-open" />
      <BracketsOpen data-testid="bracket-open" isBrackets keyName="k" />
      <BracketsClose data-testid="brace-close" isVisiable />
      <BracketsClose data-testid="bracket-close" isBrackets isVisiable keyName="k" />
      <BracketsClose isVisiable={false} />
      <TypeDate keyName="plain" />
      <TypeString keyName="empty-str" />
      <CountInfoComp keyName="size" data-testid="size-default" />
      <CountInfoExtraComps keyName="extra" />
      <ClearStores />
    </JsonView>,
  );

  await waitFor(() => {
    expect(screen.queryAllByText('string')).toHaveLength(0);
  });
  expect(screen.getByText('hello')).toBeTruthy();
  expect(screen.getByText('read')).toBeTruthy();
  expect(screen.getByText('admin')).toBeTruthy();
  expect(screen.getByTestId('quote-blank')).toBeTruthy();
  expect(screen.getByTestId('quote-num').textContent).toBe('1');
  expect(screen.getByTestId('size-default')).toBeTruthy();
});

it('renders a string outside the default shorten length', () => {
  const { container } = render(
    <Provider>
      <TypeString keyName="bare" />
    </Provider>,
  );
  expect(container.querySelector('.w-rjv-value')).toBeTruthy();
});

it('formats bigint edge values', () => {
  expect(bigIntToString()).toBe('0n');
  expect(bigIntToString(undefined)).toBe('0n');
  expect(bigIntToString('nope')).toBe('0n');
  expect(bigIntToString('')).toBe('0n');
  expect(bigIntToString(BigInt(0))).toBe('0n');
  expect(bigIntToString('0')).toBe('0n');
  expect(bigIntToString('12')).toBe('12n');
});

it('calls the default dispatchers outside a provider', () => {
  const { result } = renderHook(() => ({
    dispatch: useDispatch(),
    dispatchStore: useDispatchStore(),
    expands: useExpandsDispatch(),
    section: useSectionDispatch(),
    showTools: useShowToolsDispatch(),
    symbols: useSymbolsDispatch(),
    types: useTypesDispatch(),
  }));
  expect(() => {
    result.current.dispatch({});
    result.current.dispatchStore({});
    result.current.expands({});
    result.current.section({});
    result.current.showTools({});
    result.current.symbols({});
    result.current.types({});
  }).not.toThrow();
});

it('ignores a null copied section', () => {
  function ClearCopied() {
    const dispatch = useSectionDispatch();
    useEffect(() => {
      dispatch({ Copied: null as never });
    }, [dispatch]);
    return null;
  }
  render(
    <JsonView value={{ a: 1 }}>
      <ClearCopied />
    </JsonView>,
  );
  expect(screen.getByText('a')).toBeTruthy();
});
