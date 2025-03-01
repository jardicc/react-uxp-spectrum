import React from 'react';
import { SpectrumComponentSize, SpectrumComponetDefaults } from './common';

namespace Spectrum {
  export type BodyClassification = 'serif' | 'sans serif';
  export type BodyScript = 'latin' | 'han' | 'arabic' | 'hebrew';
}

type Props = {
  children?: React.ReactNode;
  className?: string;
  classification?: Spectrum.BodyClassification;
  script?: Spectrum.BodyScript;
  size?: SpectrumComponentSize;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sp-body': {
        children?: React.ReactNode;
        class?: string;
        classification?: Spectrum.BodyClassification;
        script?: Spectrum.BodyScript;
        size?: SpectrumComponentSize;
      };
    }
  }
}

/**
 * Renders body text that is theme aware.
 *
 * @example
 * ```jsx
 * <Spectrum.Body size="XL">This is some body text</Spectrum.Body>
 * ```
 */
export default function Body(props: Props) {
  return (
    <sp-body
      class={props?.className}
      classification={props?.classification}
      script={props?.script}
      size={props?.size || SpectrumComponetDefaults.defaultSize}
    >
      {props?.children}
    </sp-body>
  );
}
