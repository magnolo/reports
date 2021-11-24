/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@twentythree/fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'user-interface',
    title: 'Overview',
    subtitle: 'Made out of cards',
    type: 'group',
    icon: 'heroicons_outline:collection',
    children: [
      {
        id: 'user-interface.cards',
        title: 'Cards',
        type: 'basic',
        icon: 'heroicons_outline:duplicate',
        link: '/cards',
      },
    ],
  },
  {
    id: 'dashboards',
    title: 'Details',
    subtitle: 'Specific content',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.analytics',
        title: 'Analytics',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/analytics',
      },
      {
        id: 'dashboards.analytics',
        title: 'Project',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/details',
      },
    ],
  },
];
export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'user-interface',
    title: 'UI',
    tooltip: 'UI',
    type: 'aside',
    icon: 'heroicons_outline:collection',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    tooltip: 'Dashboards',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'user-interface',
    title: 'User Interface',
    type: 'aside',
    icon: 'heroicons_outline:collection',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'dashboards',
    title: 'DASHBOARDS',
    type: 'group',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'user-interface',
    title: 'UI',
    type: 'group',
    icon: 'heroicons_outline:collection',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
