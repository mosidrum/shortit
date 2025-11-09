import cn from 'classnames';

import styles from './Text.module.scss';

import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fontSize?: 'fs-2xl' | 'fs-xl' | 'fs-lg' | 'fs-base' | 'fs-sm' | 'fs-xs';
  fontWeight?: 'bolder' | 'bold' | 'normal';
  fontStyle?: 'italic' | 'underline' | 'normal';
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
  onClick?: () => void;
  className?: string;
};

export const Text = ({
  fontWeight = 'normal',
  fontSize = 'fs-base',
  fontStyle = 'normal',
  variant = 'default',
  onClick,
  className,
  children
}: Props) => {
  const fontsize = styles[fontSize];
  const fontweight = styles[fontWeight];
  const fontstyle = styles[fontStyle];
  const fontvariant = styles[variant];

  return (
    <div className={cn(fontsize, fontstyle, fontvariant, fontweight, className)} onClick={onClick}>
      {children}
    </div>
  );
};
