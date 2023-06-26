import { Fragment, useState } from "react";
import { Copied } from './copied';
import { JsonViewProps } from './';

interface ToolsProps<T extends object> {
  enableClipboard?: boolean;
  value?: T | {};
  onCopied?: JsonViewProps<T>['onCopied'];
  components?: JsonViewProps<T>['components'];
  showTools?: boolean;
}

export function Tools<T extends object>(props: ToolsProps<T>) {
  const { enableClipboard, value, showTools, components, onCopied } = props;
  return (
    <Fragment>
      {enableClipboard && <Copied show={showTools} text={value as T} onCopied={onCopied} render={components?.copied} />}
    </Fragment>
  )
}