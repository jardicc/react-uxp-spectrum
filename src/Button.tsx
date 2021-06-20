import React, { useEffect, useRef } from 'react';

namespace Spectrum {
  export type ButtonVariant =
    | 'cta'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'overBackground';
}

type Props = {
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  quiet?: boolean;
  variant?: Spectrum.ButtonVariant;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-button': {
        children?: React.ReactNode;
        ref?: React.RefObject<HTMLElement>;
        class?: string;
        disabled?: boolean;
        quiet?: boolean;
        variant?: Spectrum.ButtonVariant;
      };
    }
  }
}

export default function Button(props: Props) {
  const ref = useRef<HTMLElement>(null);
  const dispatchClick = (e: MouseEvent) => props.onClick?.(e);

  useEffect(() => {
    ref.current?.addEventListener('click', dispatchClick);
    return () => {
      ref.current?.removeEventListener('click', dispatchClick);
    };
  }, []);

  const variant = props.variant || (props.quiet === true ? 'primary' : 'cta');

  return (
    <sp-button
      ref={ref}
      class={props.className}
      disabled={props.disabled || undefined}
      quiet={props.quiet || undefined}
      variant={variant}
    >
      {props.children}
    </sp-button>
  );
}