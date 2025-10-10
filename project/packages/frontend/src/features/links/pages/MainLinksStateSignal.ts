import { signal } from '@preact/signals-react';

type TabHeaderType = 'link' | 'profile';

export const tabHeader = signal<TabHeaderType>('link');
