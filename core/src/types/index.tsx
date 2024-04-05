import { FC, Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { useStore } from '../store';
import { useTypesStore } from '../store/Types';
import { ValueQuote } from '../symbol';

export const bigIntToString = (bi?: BigInt | string) => {
  if (bi === undefined) {
    return '0n';
  } else if (typeof bi === 'string') {
    try {
      bi = BigInt(bi);
    } catch (e) {
      return '0n';
    }
  }
  return bi ? bi.toString() + 'n' : '0n';
};

export const SetComp: FC<PropsWithChildren<{ value: unknown; keyName: string | number }>> = ({ value, keyName }) => {
  const { Set: Comp = {}, displayDataTypes } = useTypesStore();
  const isSet = value instanceof Set;
  if (!isSet || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === 'function';
  const type = isRender && render(reset, { type: 'type', value, keyName });
  if (type) return type;

  const Elm = as || 'span';
  return <Elm {...reset} />;
};

SetComp.displayName = 'JVR.SetComp';

export const MapComp: FC<PropsWithChildren<{ value: unknown; keyName: string | number }>> = ({ value, keyName }) => {
  const { Map: Comp = {}, displayDataTypes } = useTypesStore();
  const isMap = value instanceof Map;
  if (!isMap || !displayDataTypes) return null;
  const { as, render, ...reset } = Comp;
  const isRender = render && typeof render === 'function';
  const type = isRender && render(reset, { type: 'type', value, keyName });
  if (type) return type;

  const Elm = as || 'span';
  return <Elm {...reset} />;
};

MapComp.displayName = 'JVR.MapComp';

const defalutStyle: React.CSSProperties = {
  opacity: 0.75,
  paddingRight: 4,
};

type TypeProps = PropsWithChildren<{
  keyName: string | number;
}>;

export const TypeString: FC<TypeProps> = ({ children = '', keyName }) => {
  const { Str = {}, displayDataTypes } = useTypesStore();
  const { shortenTextAfterLength: length = 30 } = useStore();
  const { as, render, ...reset } = Str;
  const childrenStr = children as string;
  const [shorten, setShorten] = useState(length && childrenStr.length >= length);
  useEffect(() => setShorten(length && childrenStr.length >= length), [length]);
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Str.style || {}),
  };

  if (length > 0) {
    reset.style = {
      ...reset.style,
      cursor: childrenStr.length <= length ? 'initial' : 'pointer',
    };
    if (childrenStr.length > length) {
      reset.onClick = () => {
        setShorten(!shorten);
      };
    }
  }
  const text = shorten ? `${childrenStr.slice(0, length)}...` : childrenStr;

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender &&
    render({ ...reset, children: text, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });
  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Fragment>
          <ValueQuote />
          <Comp {...reset} className="w-rjv-value">
            {text}
          </Comp>
          <ValueQuote />
        </Fragment>
      )}
    </Fragment>
  );
};

TypeString.displayName = 'JVR.TypeString';

export const TypeTrue: FC<TypeProps> = ({ children, keyName }) => {
  const { True = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = True;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(True.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });
  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {children?.toString()}
        </Comp>
      )}
    </Fragment>
  );
};

TypeTrue.displayName = 'JVR.TypeTrue';

export const TypeFalse: FC<TypeProps> = ({ children, keyName }) => {
  const { False = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = False;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(False.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {children?.toString()}
        </Comp>
      )}
    </Fragment>
  );
};

TypeFalse.displayName = 'JVR.TypeFalse';

export const TypeFloat: FC<TypeProps> = ({ children, keyName }) => {
  const { Float = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Float;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Float.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {children?.toString()}
        </Comp>
      )}
    </Fragment>
  );
};

TypeFloat.displayName = 'JVR.TypeFloat';

export const TypeInt: FC<TypeProps> = ({ children, keyName }) => {
  const { Int = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Int;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Int.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {children?.toString()}
        </Comp>
      )}
    </Fragment>
  );
};

TypeInt.displayName = 'JVR.TypeInt';

export const TypeBigint: FC<{ children?: BigInt } & Omit<TypeProps, 'children'>> = ({ children, keyName }) => {
  const { Bigint: CompBigint = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompBigint;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(CompBigint.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {bigIntToString(children?.toString())}
        </Comp>
      )}
    </Fragment>
  );
};

TypeBigint.displayName = 'JVR.TypeFloat';

export const TypeUrl: FC<{ children?: URL } & Omit<TypeProps, 'children'>> = ({ children, keyName }) => {
  const { Url = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Url;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...Url.style,
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender &&
    render(
      { ...reset, children: children?.href, className: 'w-rjv-value' },
      { type: 'value', value: children, keyName },
    );

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <a href={children?.href} target="_blank" {...reset} className="w-rjv-value">
          <ValueQuote />
          {children?.href}
          <ValueQuote />
        </a>
      )}
    </Fragment>
  );
};

TypeUrl.displayName = 'JVR.TypeUrl';

export const TypeDate: FC<{ children?: Date } & Omit<TypeProps, 'children'>> = ({ children, keyName }) => {
  const { Date: CompData = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompData;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(CompData.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const childStr = children instanceof Date ? children.toLocaleString() : children;
  const child =
    isRender &&
    render({ ...reset, children: childStr, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Comp {...reset} className="w-rjv-value">
          {childStr}
        </Comp>
      )}
    </Fragment>
  );
};

TypeDate.displayName = 'JVR.TypeDate';

export const TypeUndefined: FC<TypeProps> = ({ children, keyName }) => {
  const { Undefined = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Undefined;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Undefined.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeUndefined.displayName = 'JVR.TypeUndefined';

export const TypeNull: FC<TypeProps> = ({ children, keyName }) => {
  const { Null = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Null;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Null.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender && render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeNull.displayName = 'JVR.TypeNull';

export const TypeNan: FC<TypeProps> = ({ children, keyName }) => {
  const { Nan = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Nan;
  const Comp = as || 'span';
  const style: React.CSSProperties = {
    ...defalutStyle,
    ...(Nan.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName });
  const child =
    isRender &&
    render(
      { ...reset, children: children?.toString(), className: 'w-rjv-value' },
      { type: 'value', value: children, keyName },
    );

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeNan.displayName = 'JVR.TypeNan';
