import React, { useEffect, useRef } from 'react';

namespace Spectrum {
  export interface RadioEvent extends globalThis.Event {
    readonly target: (EventTarget & { value: string }) | null;
  }
}

type Props = {
  children?: React.ReactNode;
  onClick?: (e: Spectrum.RadioEvent) => void;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  emphasized?: boolean;
  invalid?: boolean;
  value?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-radio': {
        children?: React.ReactNode;
        ref?: React.RefObject<HTMLElement>;
        class?: string;
        checked?: boolean;
        disabled?: boolean;
        emphasized?: boolean;
        invalid?: boolean;
        value?: string;
      };
    }
  }
}

export default function Radio(props: Props) {
  const ref = useRef<HTMLElement>(null);
  const dispatchInput = (e: Event) => props.onClick?.(e as Spectrum.RadioEvent);

  useEffect(() => {
    ref.current?.addEventListener('input', dispatchInput);
    return () => {
      ref.current?.removeEventListener('input', dispatchInput);
    };
  }, [ref]);

  return (
    <sp-radio
      ref={ref}
      class={props?.className}
      checked={props?.checked || undefined}
      disabled={props?.disabled || undefined}
      emphasized={props?.emphasized || undefined}
      invalid={props.invalid || undefined}
      value={props.value}
    >
      {props?.children}
    </sp-radio>
  );
}
