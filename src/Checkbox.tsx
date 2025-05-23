import React, { useEffect, useRef } from 'react';
import { SpectrumComponentSize, SpectrumComponetDefaults } from './common';

namespace Spectrum {
  export interface CheckboxEvent extends globalThis.Event {
    readonly target: (EventTarget & { checked: boolean }) | null;
  }
}

type Props = {
  children?: React.ReactNode;
  onChange?: (e: Spectrum.CheckboxEvent) => void;
  onInput?: (e: Spectrum.CheckboxEvent) => void;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  invalid?: boolean;
  size?: SpectrumComponentSize;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-checkbox': {
        children?: React.ReactNode;
        ref?: React.RefObject<HTMLElement>;
        class?: string;
        checked?: boolean;
        disabled?: boolean;
        indeterminate?: boolean;
        invalid?: boolean;
        size?: SpectrumComponentSize;
        onClick?: (e?: any) => void;
      };
    }
  }
}

/**
 * Renders a checkbox with associated label.
 *
 * @example
 * ```jsx
 * <Spectrum.Checkbox checked>Checked</Spectrum.Checkbox>
 * ```
 */
export default function Checkbox(props: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const dispatchChange = (e: Event) =>
      props.onChange?.(e as Spectrum.CheckboxEvent);

    ref.current?.addEventListener('change', dispatchChange);
    return () => {
      ref.current?.removeEventListener('change', dispatchChange);
    };
  }, [props.onChange]);

  useEffect(() => {
    const dispatchInput = (e: Event) =>
      props.onInput?.(e as Spectrum.CheckboxEvent);

    ref.current?.addEventListener('input', dispatchInput);
    return () => {
      ref.current?.removeEventListener('input', dispatchInput);
    };
  }, [props.onInput]);

  return (
    <sp-checkbox
      ref={ref}
      class={props?.className}
      checked={props?.checked || undefined}
      disabled={props?.disabled || undefined}
      indeterminate={props?.indeterminate || undefined}
      invalid={props.invalid || undefined}
      size={props?.size || SpectrumComponetDefaults.defaultSize}
    >
      {props?.children}
    </sp-checkbox>
  );
}
