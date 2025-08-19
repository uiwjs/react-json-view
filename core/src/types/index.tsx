import { type FC, Fragment, type PropsWithChildren, useEffect, useState } from 'react';
import type * as CSS from 'csstype';
import { useStore } from '../store';
import { useTypesStore } from '../store/Types';
import { ValueQuote } from '../symbol/';

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

const defalutStyle: CSS.Properties<string | number> = {
  opacity: 0.75,
  paddingRight: 4,
};

type TypeProps = PropsWithChildren<{
  keyName: string | number;
  keys?: (string | number)[];
}>;

export const TypeString: FC<TypeProps> = ({ children = '', keyName, keys }) => {
  const { Str = {}, displayDataTypes } = useTypesStore();
  const { shortenTextAfterLength: length = 30, stringEllipsis = '...' } = useStore();
  const { as, render, ...reset } = Str;
  const childrenStr = children as string;
  const [shorten, setShorten] = useState(length && childrenStr.length > length);
  useEffect(() => setShorten(length && childrenStr.length > length), [length]);
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
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
  const text = shorten ? `${childrenStr.slice(0, length)}${stringEllipsis}` : childrenStr;

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const cls = shorten ? 'w-rjv-value w-rjv-value-short' : 'w-rjv-value';
  const child =
    isRender && render({ ...reset, children: text, className: cls }, { type: 'value', value: children, keyName, keys });
  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child || (
        <Fragment>
          <ValueQuote />
          <Comp {...reset} className={cls}>
            {text}
          </Comp>
          <ValueQuote />
        </Fragment>
      )}
    </Fragment>
  );
};

TypeString.displayName = 'JVR.TypeString';

export const TypeTrue: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { True = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = True;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(True.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });
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

export const TypeFalse: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { False = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = False;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(False.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

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

export const TypeFloat: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { Float = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Float;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(Float.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

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

export const TypeInt: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { Int = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Int;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(Int.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

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

export const TypeBigint: FC<{ children?: BigInt } & Omit<TypeProps, 'children'>> = ({ children, keyName, keys }) => {
  const { Bigint: CompBigint = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompBigint;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(CompBigint.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

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

export const TypeUrl: FC<{ children?: URL } & Omit<TypeProps, 'children'>> = ({ children, keyName, keys }) => {
  const { Url = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Url;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...Url.style,
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render(
      { ...reset, children: children?.href, className: 'w-rjv-value' },
      { type: 'value', value: children, keyName, keys },
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

export const TypeDate: FC<{ children?: Date } & Omit<TypeProps, 'children'>> = ({ children, keyName, keys }) => {
  const { Date: CompData = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = CompData;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(CompData.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const childStr = children instanceof Date ? children.toLocaleString() : children;
  const child =
    isRender &&
    render(
      { ...reset, children: childStr, className: 'w-rjv-value' },
      { type: 'value', value: children, keyName, keys },
    );

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

export const TypeUndefined: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { Undefined = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Undefined;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(Undefined.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeUndefined.displayName = 'JVR.TypeUndefined';

export const TypeNull: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { Null = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Null;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(Null.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render({ ...reset, children, className: 'w-rjv-value' }, { type: 'value', value: children, keyName, keys });

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeNull.displayName = 'JVR.TypeNull';

export const TypeNan: FC<TypeProps> = ({ children, keyName, keys }) => {
  const { Nan = {}, displayDataTypes } = useTypesStore();
  const { as, render, ...reset } = Nan;
  const Comp = as || 'span';
  const style: CSS.Properties<string | number> = {
    ...defalutStyle,
    ...(Nan.style || {}),
  };

  const isRender = render && typeof render === 'function';
  const type = isRender && render({ ...reset, style }, { type: 'type', value: children, keyName, keys });
  const child =
    isRender &&
    render(
      { ...reset, children: children?.toString(), className: 'w-rjv-value' },
      { type: 'value', value: children, keyName, keys },
    );

  return (
    <Fragment>
      {displayDataTypes && (type || <Comp {...reset} style={style} />)}
      {child}
    </Fragment>
  );
};

TypeNan.displayName = 'JVR.TypeNan';
