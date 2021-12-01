export const SUNBURST_DATA = {
  name: 'EPI 2020',
  field: 'EPI',
  children: [
    {
      name: 'Ecosystem Vitality',
      color: '#256487',
      field: 'ECS',
      // value: 60,
      children: [
        {
          name: 'Climate & Energy',
          color: '#65C363',
          field: 'CCH',
          // value: 30,
          children: [
            {
              name: 'CO2 Emissions (Total)',
              field: 'CDA',
              value: 50,
            },
            {
              name: 'CO2 Emissions (Power)',
              field: 'CHA',
              value: 20,
            },
            {
              name: 'Methane Emissions',
              field: 'FGA',
              value: 20,
            },
            {
              name: 'N2O Emissions',
              value: 5,
              field: 'NDA',
            },
            {
              name: 'Black Carbon Emissions',
              field: 'BCA',
              value: 5,
            },
          ],
        },
        {
          name: 'Biodiversity & Habitat',
          field: 'BDH',
          // value: 25,
          children: [
            {
              name: 'Marine Protected Areas',
              field: 'MPA',
              value: 20,
            },
            {
              name: 'Biome Protection (Global)',
              value: 20,
              field: 'TBG',
            },
            {
              name: 'Biome Protection (National)',
              field: 'TBN',
              value: 20,
            },
            {
              name: 'Species Protection Index ',
              field: 'SPI',
              value: 20,
            },
            {
              name: 'Representativeness Index',
              field: 'SHI',
              value: 10,
            },
            {
              name: 'Species Habitat Index',
              field: 'BHV',
              value: 10,
            },
          ],
        },
        {
          name: 'Forests',
          field: 'ECS',
          // value: 10,
          children: [
            {
              name: 'Tree Cover Loss',
              field: 'TCL',
              value: 100,
            },
          ],
        },
        {
          name: 'Fisheries',
          field: 'FSH',
          // value: 10,
          children: [
            {
              name: 'Fish Stock Status',
              field: 'FSS',
              value: 50,
            },
            {
              name: 'Regional Marine Trophic Index',
              value: 50,
              field: 'RMS'
            },
          ],
        },
        {
          name: 'Air Pollution',
          field: 'APE',
          // value: 10,
          children: [
            {
              name: 'S2O Emissions (50%)',
              field: 'SDA',
              value: 50,
            },
            {
              name: 'NOX Emissions (50%)',
              field: 'NXA',
              value: 50,
            },
          ],
        },
        {
          name: 'Water resources',
          field:'WRS',
          // value: 25,
          children: [
            {
              name: 'Wastewater treatment',
              value: 100,
              field: 'WWT'
            },
          ],
        },
        {
          name: 'Agriculture',
          // value: 10,
          field: 'AGR',
          children: [
            {
              name: 'Sustainable Nitrogen management',
              value: 100,
              field: 'SNM'
            },
          ],
        },
      ],
    },
    {
      name: 'Environmental health',
      color: '#DD3B30',
      field: 'HLT',
      // value: 40,
      children: [
        {
          name: 'Air quality',
          field: 'AIR',
          // value: 30,
          color: '#F9CA32',
          children: [
            {
              name: 'Household Solid Fuels',
              color: '#FDD734',
              field: 'HAD',
              value: 40,
            },
            {
              name: 'Average Exposure to PM2.5',
              color: '#FEE264',
              field: 'PMD',
              value: 30,
            },
            {
              name: 'Air pollution - PM2.5 Exceedance',
              value: 30,
              field: 'HAD',
              color: '#FEEC98'
            },
          ],
        },
        {
          name: 'Water Quality',
          field: 'H2O',
          // value: 30,
          color: '#EA5833',
          children: [
            {
              name: 'Unsafe Sanitation',
              color: '#F2A070',
              field: 'USD',
              value: 50,
            },
            {
              name: 'Drinking Water Quality',
              color: '#EE7E36',
              field: 'UWD',
              value: 50,
            },
          ],
        },
        {
          name: 'Heavy metals',
          color: '#F19032',
          field: 'HMT',
          // value: 10,
          children: [
            {
              name: 'Lead Exposure',
              value: 100,
              field: 'PBD',
              color: '#F4A932'
            },
          ],
        },
      ],
    },
  ],
};
